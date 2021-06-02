package com.bookmarkd;

import com.bookmarkd.api.config.MongoDBConfiguration;
import com.bookmarkd.api.daos.UserDao;
import com.bookmarkd.api.models.User;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@SpringBootTest(classes = {MongoDBConfiguration.class})
@EnableConfigurationProperties
@EnableAutoConfiguration
//@RunWith(SpringJUnit4ClassRunner.class)
public class UserTest {

  private UserDao userDao;
  private User testUser;
  private static String email = "test.user@techtonic.com";

  @Autowired MongoClient mongoClient;

  @Value("${spring.mongodb.database}")
  String databaseName;

//  @Value("${spring.mongodb.uri}")
//  private String uri;

  @BeforeEach
  public void setup() {
    this.userDao = new UserDao(mongoClient, databaseName);
    this.testUser = new User();
    this.testUser.setName("Test User");
    this.testUser.setEmail(email);
    mongoClient
            .getDatabase(databaseName)
            .getCollection("users")
            .deleteOne(new Document("email", email));
  }

  @AfterEach
  public void tearDownClass() {
    MongoDatabase db = mongoClient.getDatabase(databaseName);
    db.getCollection("users").deleteOne(new Document("email", email));
  }

  @Test
  public void RegisterUser() {

    Assertions.assertTrue(userDao.addUser(testUser));
    User user = userDao.getUser(testUser.getEmail());
    Assertions.assertNotNull(user);
    Assertions.assertEquals(testUser.getEmail(), user.getEmail());
    Assertions.assertEquals(testUser.getName(), user.getName());
  }

//  @Test
//  public void LoginUser() {
//
//  }
}
