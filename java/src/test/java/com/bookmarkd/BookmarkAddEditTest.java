package com.bookmarkd;

import com.bookmarkd.api.config.MongoDBConfiguration;
import com.bookmarkd.api.daos.BookmarkDao;
import com.bookmarkd.api.daos.FolderDao;
import com.bookmarkd.api.models.Bookmark;
import com.bookmarkd.api.models.Folder;
import com.mongodb.client.MongoClient;
import org.bson.BsonObjectId;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@SpringBootTest(classes = {MongoDBConfiguration.class})
@EnableConfigurationProperties
@EnableAutoConfiguration
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class BookmarkAddEditTest {

  private BookmarkDao bookmarkDao;
  private FolderDao folderDao;
  private Bookmark testBookmark;
  private Folder testFolder;
  private final String userId = "604109a74c3b1cc5f71e9f00"; // ian.goodwin@techtonic.com
  private final String folderId = "6074c99a32929100155d33d3";
  private final List<String> tags = new ArrayList<>();

  @Autowired
  MongoClient mongoClient;

  @Value("${spring.mongodb.database}")
  String databaseName;

  @BeforeAll
  public void setup() {
    this.bookmarkDao = new BookmarkDao(mongoClient, databaseName);
    this.folderDao = new FolderDao(mongoClient, databaseName);

    this.testFolder = this.folderDao.getFolders(this.userId).get(0);
    Assertions.assertNotNull(this.testFolder);

    this.tags.add("MongoDB");
    this.tags.add("Databases");
    this.testBookmark = new Bookmark(
            this.userId,
            this.folderId,
            "Databases and Collections",
            "MongoDB stores documents in collections; the collections in databases.",
            "https://mongodb.github.io/mongo-java-driver/4.2/driver/tutorials/databases-collections/",
            "https://www.mongodb.com/assets/images/global/favicon.ico",
            this.tags,
            (new Date()).toString()
    );
    // Do I create a new folder for this bookmark, to be sure one exists?
    // Do I add this bookmark to the folders collection here, edit it, then delete it?
    // Do I create two bookmarks here, inserted one here, and use another to post in a test?
    // Or do I create one bookmark for each CRUD operation?
  }

  @AfterAll
  public void teardown() {

  }

  @Test
  public void AddBookmarkToFolder() {
    // Verify if ObejctId is returned from bookmark dao, meaning bookmark was successfully inserted
    BsonObjectId addedBookmarkId = bookmarkDao.addBookmark(this.testBookmark);
    Assertions.assertNotNull(addedBookmarkId);

    // Verify if new bookmark can be retrieved
    Bookmark addedBookmark = bookmarkDao.getBookmark(addedBookmarkId);
    Assertions.assertNotNull(addedBookmark);

    // Verify bookmark was inserted with correct data
    Assertions.assertEquals(addedBookmark.getTitle(), "Databases and Collections");
    Assertions.assertEquals(addedBookmark.getDescription(), this.testBookmark.getDescription());
    Assertions.assertEquals(addedBookmark.getFavicon(), this.testBookmark.getFavicon());
    Assertions.assertEquals(addedBookmark.getUrl(), this.testBookmark.getUrl());
    Assertions.assertEquals(addedBookmark.getTags(), this.testBookmark.getTags());
  }

  @Test
  public void EditBookmark() {
    //MongoDB Java Driver documentation
    this.testBookmark.setDescription("UPDATED DESCRIPTION FOR BOOKMARK");
    this.testBookmark.setTitle("Wow wow wow");
    boolean updatedBookmark = bookmarkDao.replaceBookmark(this.testBookmark, this.testBookmark.getId());
    Assertions.assertTrue(updatedBookmark);
//    Assertions.assertEquals(updatedBookmark.getDescription(), "UPDATED DESCRIPTION FOR BOOKMARK");

    this.testBookmark.setDescription("This is a description");
    this.testBookmark.setTitle("Test Bookmark");
    boolean updatedBookmark2 = bookmarkDao.replaceBookmark(this.testBookmark, this.testBookmark.getId());
    Assertions.assertTrue(updatedBookmark2);
//    Assertions.assertEquals(updatedBookmark2.getDescription(), "This is a description");

  }

  @Test
  public void DeleteBookmark() {
    Bookmark deletedBookmark = bookmarkDao.deleteBookmark("");
  }
}
