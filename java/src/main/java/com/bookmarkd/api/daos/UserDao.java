package com.bookmarkd.api.daos;

import com.bookmarkd.api.models.User;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

// Connects to the db through AbstractBookmarkdDao
@Configuration
public class UserDao extends AbstractBookmarkdDao {

  private final MongoCollection<User> usersCollection;

  @Autowired
  public UserDao(MongoClient mongoClient, @Value("${spring.mongodb.database}") String databaseName) {
    super(mongoClient, databaseName);

    usersCollection = db.getCollection("users", User.class);
  }

  // Adds a new user to the users collection
  public boolean addUser(User user) {
    if (user == null) return false;
    if (usersCollection.find(new Document("email", user.getEmail())).first() == null) {
      usersCollection.insertOne(user);
      return true;
    }
    return false;
  }

  // Retrieves user from users collection
  public User getUser(String email) {
    if (email == null || email.length() == 0) return null;
    return usersCollection.find(new Document("email", email)).first();
  }

  // Deletes a user from the users collection
//  public boolean deleteUser(String email) {
//    if (email == null || email.length() == 0) return false;
//    if (usersCollection.deleteOne(new Document("email", email)).getDeletedCount() == 1) {
//      return true;
//    }
//    return false;
//  }
}
