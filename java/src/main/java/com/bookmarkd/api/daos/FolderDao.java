package com.bookmarkd.api.daos;

import com.bookmarkd.api.models.Folder;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import org.bson.BsonObjectId;
import org.bson.BsonValue;
import org.bson.Document;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import java.util.ArrayList;
import java.util.List;

@Configuration
public class FolderDao extends AbstractBookmarkdDao {

  private final MongoCollection<Folder> foldersCollection;

  @Autowired
  public FolderDao(MongoClient mongoClient, @Value("${spring.mongodb.database}") String databaseName) {
    super(mongoClient, databaseName);
    foldersCollection = db.getCollection("folders", Folder.class);
  }

  // Returns an array of folders, given a user id
  public List<Folder> getFolders(String userId) {
    if (userId == null || userId.isEmpty()) return null;
    List<Folder> folders = foldersCollection.find(new Document("user_id", userId)).into(new ArrayList<>());
    return folders;
  }

  // Gets a folder from db given folder id
  public Folder getFolder(String folderId) {
    if (folderId == null || folderId.isEmpty()) return null;
    return foldersCollection.find(new Document("_id", new ObjectId(folderId))).first();
  }
  public Folder getFolder(BsonObjectId id) {
    if (id.isNull()) return null;
    return foldersCollection.find(new Document("_id", id)).first();
  }

  // Adds a new folder to db, returns inserted id
  public BsonObjectId addFolder(Folder folder) {
    if (folder == null) return null;
    BsonValue insertedId = foldersCollection.insertOne(folder).getInsertedId();
    if (insertedId.isNull()) return null;
    return insertedId.asObjectId();
  }

  // Updates a folder (by replacing it) and returns it
  public Folder replaceFolder(Folder folder, String folderId) {
    if (folder == null) return null;
    foldersCollection.replaceOne(new Document("_id", new ObjectId(folderId)), folder);
    folder.setId(folderId);
    return folder;
  }

  // Deletes a folder, given a folder _id
  public long deleteFolder(String id) {
    if (id == null || id.isEmpty()) return 0L;
    return foldersCollection.deleteOne(new Document("_id", new ObjectId(id))).getDeletedCount();
  }
}
