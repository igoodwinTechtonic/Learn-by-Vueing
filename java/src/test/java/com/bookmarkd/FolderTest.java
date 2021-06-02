package com.bookmarkd;

import com.bookmarkd.api.config.MongoDBConfiguration;
import com.bookmarkd.api.daos.FolderDao;
import com.bookmarkd.api.models.Folder;
import com.mongodb.client.MongoClient;
import org.bson.BsonObjectId;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest(classes = {MongoDBConfiguration.class})
@EnableConfigurationProperties
@EnableAutoConfiguration
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class FolderTest {

  private FolderDao folderDao;
  private Folder testFolder;
  private String testId;
//  private static final String email = "test.user@techtonic.com";

  @Autowired
  MongoClient mongoClient;

  @Value("${spring.mongodb.database}")
  String databaseName;

  @BeforeAll
  public void setup() {
    this.folderDao = new FolderDao(mongoClient, databaseName);
    this.testFolder = new Folder();
  }

//  @AfterEach
//  public void tearDownClass() {
//    MongoDatabase db = mongoClient.getDatabase(databaseName);
//    db.getCollection("folders").deleteOne(new Document("email", email));
//  }

  @Test
  public void UpdateFolderName() {
    testFolder = folderDao.getFolder("606779c76a6d45e2d4fba907");
    Assertions.assertEquals(testFolder.getName(), "Testing Yeah");

    testFolder.setName("Just Updated");
    Folder updatedFolder = folderDao.replaceFolder(testFolder, "606779c76a6d45e2d4fba907");
    Assertions.assertNotNull(updatedFolder);
    Assertions.assertEquals(updatedFolder.getName(), testFolder.getName());

    testFolder.setName("Testing Yeah");
    Folder updatedFolder2 = folderDao.replaceFolder(testFolder, "606779c76a6d45e2d4fba907");
    Assertions.assertNotNull(updatedFolder2);
    Assertions.assertEquals(updatedFolder2.getName(), testFolder.getName());
  }

  @Test
  public void GetFoldersGivenUserId() {
    List<Folder> folders = folderDao.getFolders("604109a74c3b1cc5f71e9f00");
    Assertions.assertNotNull(folders);
    Assertions.assertEquals(folders.size(), 3);
  }

  @Test
  public void PostFolder() {
//    Folder folder = new Folder();
    testFolder.setUser_id("604109a74c3b1cc5f71e9f00");
    testFolder.setIcon("mdiTestTube");
    testFolder.setName("Test Post Folder");
    testFolder.setShareable(false);
    BsonObjectId insertedId = folderDao.addFolder(testFolder);
    this.testId = insertedId.toString();
    testFolder.setId(insertedId.getValue().toString());
    Assertions.assertNotNull(insertedId);
    Assertions.assertEquals(insertedId.getValue().toString().length(), 24);
    System.out.println(insertedId.getValue());
    // Insert inserted id into folder object to edit / delete in future tests
    testFolder.setOid(insertedId.getValue());
    testFolder.setId(insertedId.getValue().toString());
  }

  @Test
  public void DeleteFolder() {
    long deletedBookmarksCount = folderDao.deleteFolder(this.testId);
    Assertions.assertEquals(deletedBookmarksCount, 1);
  }
}
