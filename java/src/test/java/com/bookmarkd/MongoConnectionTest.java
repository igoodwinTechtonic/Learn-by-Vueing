package com.bookmarkd;

import com.bookmarkd.api.models.User;
import com.mongodb.MongoClientSettings;
import com.mongodb.client.*;
import org.bson.codecs.configuration.CodecRegistry;
import org.bson.codecs.pojo.PojoCodecProvider;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.Assertions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;

import static org.bson.codecs.configuration.CodecRegistries.fromProviders;
import static org.bson.codecs.configuration.CodecRegistries.fromRegistries;

@SpringBootTest
class MongoConnectionTest {

  @Autowired
  private MongoClient mongoClient;

  private MongoDatabase database;
  private MongoCollection<User> usersCollection;

  @Value("${spring.mongodb.uri}")
  private String uri;

  CodecRegistry pojoCodecRegistry = fromRegistries(
          MongoClientSettings.getDefaultCodecRegistry(),
          fromProviders(PojoCodecProvider.builder().automatic(true).build())
  );

  @Test
  public void MongoClientInstance() {
    mongoClient = MongoClients.create(uri);

    Assertions.assertNotNull(mongoClient);
  }

  @Test
  public void MongoDatabaseInstance() {
    mongoClient = MongoClients.create(uri);
    database = mongoClient.getDatabase("LBV");

    Assertions.assertNotNull(database);
  }

  @Test
  public void MongoCollectionInstance() {
    mongoClient = MongoClients.create(uri);
    database = mongoClient.getDatabase("LBV");
    usersCollection = database
            .getCollection("users", User.class)
            .withCodecRegistry(pojoCodecRegistry);

    Assertions.assertNotNull(database);
    Assertions.assertNotNull(usersCollection);
    Assertions.assertNotNull(usersCollection);
  }
}
