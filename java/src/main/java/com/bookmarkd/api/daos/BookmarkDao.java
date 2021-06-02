package com.bookmarkd.api.daos;

import com.bookmarkd.api.models.Bookmark;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.model.*;
import org.bson.BsonObjectId;
import org.bson.BsonValue;
import org.bson.Document;
import org.bson.conversions.Bson;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Configuration
public class BookmarkDao extends AbstractBookmarkdDao {

  private final MongoCollection<Bookmark> bookmarksCollection;

  @Autowired
  public BookmarkDao(MongoClient mongoClient, @Value("${spring.mongodb.database}") String databaseName) {
    super(mongoClient, databaseName);
    bookmarksCollection = db.getCollection("bookmarks", Bookmark.class);
  }

  // Get

  public List<Bookmark> getBookmarksByUserId(String userId) {
    if (userId == null) return null;
    return bookmarksCollection.find(new Document("user_id", userId)).into(new ArrayList<>());
  }

  public List<Bookmark> getBookmarksByFolderId(String publicFolderId) {
    if (publicFolderId == null) return null;
    return bookmarksCollection.find(new Document("folder_id", publicFolderId)).into(new ArrayList<>());
  }

  public List<Bookmark> getBookmarksBySearchKeywords(String userId, String keywords) {
    if (userId == null || keywords == null) return null;

    List<Bson> pipeline = new ArrayList<>();
    Bson matchUserId = Aggregates.match(new Document("user_id", userId));
    Bson matchFields = Aggregates.match(Filters.or(
            Filters.regex("title", keywords, "i"),
            Filters.regex("description", keywords, "i"),
            Filters.regex("url", keywords, "i"),
            Filters.regex("dateCreated", keywords, "i"),
            Filters.regex("tags", keywords, "i")
    ));
    Bson sortByTitle = Aggregates.sort(Sorts.ascending("title"));
    pipeline.add(matchUserId);
    pipeline.add(matchFields);
    pipeline.add(sortByTitle);

    return bookmarksCollection.aggregate(pipeline).into(new ArrayList<>());
  }

  public Bookmark getBookmark(BsonObjectId id) {
    return bookmarksCollection.find(new Document("_id", id)).first();
  }
  public Bookmark getBookmark(String id) {
    return bookmarksCollection.find(new Document("_id", new ObjectId(id))).first();
  }

  public Document getTagsByUserId(String id) {
    if (id == null || id.isEmpty()) return null;

    List<Bson> pipeline = new ArrayList<>();
    Bson match = Aggregates.match(Filters.eq("user_id", id));
    Bson group = Aggregates.group(0L, Accumulators.push("tags", "$tags"));
    Bson combineArrays = Aggregates.project(Projections.fields(
            Projections.fields(
                    new Document("tags", new Document("$reduce",
                            new Document("input", "$tags")
                                    .append("initialValue", Arrays.asList())
                                    .append("in", new Document("$setUnion", Arrays.asList("$$value", "$$this")))))
            ),
            Projections.excludeId()));
    pipeline.add(match);
    pipeline.add(group);
    pipeline.add(combineArrays);

    // Returns a single document containing: { "tags": [ "tag1", "tag2", ... ] }
    return bookmarksCollection.aggregate(pipeline, Document.class).first();
  }

  // Post

  public BsonObjectId addBookmark(Bookmark bookmark) {
    if (bookmark == null) return null;
    BsonValue insertedId = bookmarksCollection.insertOne(bookmark).getInsertedId();
    if (insertedId == null) return null;
    return insertedId.asObjectId();
  }

  // Update

  public boolean replaceBookmark(Bookmark bookmark, String id) {
    if (bookmark == null || id == null || id.isEmpty()) return false;
    // findOneAndReplace returns the document before updates
    bookmarksCollection.findOneAndReplace(new Document("_id", new ObjectId(id)), bookmark);
    return true;
  }

  // Delete

  public Bookmark deleteBookmark(String id) {
    if (id == null || id.isEmpty()) return null;
    return bookmarksCollection.findOneAndDelete(new Document("_id", new ObjectId(id)));
  }

  public long deleteAllBookmarksInFolder(String folderId) {
    if (folderId == null || folderId.isEmpty()) return -1L;
    return bookmarksCollection.deleteMany(new Document("folder_id", folderId)).getDeletedCount();
  }
}
