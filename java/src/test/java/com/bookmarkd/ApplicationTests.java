package com.bookmarkd;

import com.mongodb.client.*;
import org.bson.Document;
import org.bson.conversions.Bson;
import org.junit.jupiter.api.Test;
import org.junit.Assert;
import org.junit.jupiter.api.Assertions;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;

@SpringBootTest
class MongoConnectionTest {

  private MongoClient mongoClient;
  private MongoDatabase database;
  private MongoCollection<Document> collection;
  private String uri = "mongodb+srv://LBVuser:5sIStrnFBdJwDqwL@sandbox.zutlo.mongodb.net/lbv?retryWrites=true";
  private Document document;
  private Bson bson;

//	@Test
//	void contextLoads() {
//	}

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
    collection = database.getCollection("users");

    Assertions.assertNotNull(database);
    Assertions.assertNotNull(collection);

    Document user = collection.find(new Document("email", "ian.goodwin@techtonic.com")).first();
    Assertions.assertNotNull(user);
  }
}
//	@Test
//	public void MongoDatabaseInstance() {
//		mongoClient = MongoClients.create(uri);
//		MongoIterable<String> databaseIterable = mongoClient.listDatabaseNames();

//	  // .forEach is deprecated, unable to find a workaround
//		List<String> dbNames = new ArrayList<>();
//		databaseIterable.forEach((String name) -> {
//			System.out.println(name);
//			dbNames.add(name);
//		});
//		for (String name : databaseIterable) {
//		}

//		Assertions.assertTrue(dbNames.contains("LBV"));
//	}
