package com.bookmarkd.api.daos;

import com.bookmarkd.api.models.Bookmark;
import com.bookmarkd.api.models.Folder;
import com.bookmarkd.api.models.User;
import com.mongodb.WriteConcern;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class UserDao extends AbstractBookmarkdDao {

  private final MongoCollection<User> usersCollection;
  private final MongoCollection<Folder> foldersCollection;
  private final MongoCollection<Bookmark> bookmarksCollection;

  @Autowired
  public UserDao(MongoClient mongoClient, @Value("${spring.mongodb.database}") String databaseName) {
    super(mongoClient, databaseName);

    usersCollection = db
            .getCollection("users", User.class)
            .withWriteConcern(WriteConcern.MAJORITY);
    foldersCollection = db
            .getCollection("folders", Folder.class)
            .withWriteConcern(WriteConcern.MAJORITY);
    bookmarksCollection = db
            .getCollection("bookmarks", Bookmark.class)
            .withWriteConcern(WriteConcern.MAJORITY);
  }

  public boolean addUser(User user) {
    if (user == null) return false;
    if (usersCollection.find(new Document("email", user.getEmail())).iterator().tryNext() != null) {
      usersCollection.insertOne(user);
      return true;
    }
    return false;
  }
}
