package com.bookmarkd;

import com.bookmarkd.api.config.MongoDBConfiguration;
import com.bookmarkd.api.daos.BookmarkDao;
import com.bookmarkd.api.daos.FolderDao;
import com.bookmarkd.api.models.Bookmark;
import com.bookmarkd.api.models.Folder;
import com.mongodb.client.MongoClient;
import org.bson.BsonObjectId;
import org.bson.conversions.Bson;
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
  private BsonObjectId testFolderId;
  private final String userId = "604109a74c3b1cc5f71e9f00"; // ian.goodwin@techtonic.com
  private final List<String> tags = new ArrayList<>();

  @Autowired
  MongoClient mongoClient;

  @Value("${spring.mongodb.database}")
  String databaseName;

  @BeforeAll
  public void setup() {
    this.bookmarkDao = new BookmarkDao(mongoClient, databaseName);
    this.folderDao = new FolderDao(mongoClient, databaseName);

    this.testFolderId = this.folderDao.addFolder(
            new Folder(userId, "Test Folder", "", false)
    );
    this.testFolder = this.folderDao.getFolder(this.testFolderId);
    Assertions.assertNotNull(this.testFolder);

    this.tags.add("MongoDB");
    this.tags.add("Databases");
    this.testBookmark = new Bookmark(
            this.userId,
            this.testFolderId.toString(),
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
    // data doesn't bleed to other tests, clean slate between each test suite
  }

  @Test
  public void GetBookmarksByUserId() {
    List<Bookmark> bookmarks = bookmarkDao.getBookmarksByUserId(userId);
    Assertions.assertEquals(bookmarks.size(), 8);
    // assert greater than 0 ??
  }

  @Test
  public void GetBookmarksByFolderId() {
    List<Bookmark> bookmarks = bookmarkDao.getBookmarksByFolderId(testFolderId.getValue().toString());
    Assertions.assertEquals(bookmarks.size(), 7);
  }

  @Test
  public void GetBookmarksBySearchKeywords() {
    List<Bookmark> search1 = bookmarkDao.getBookmarksBySearchKeywords(userId, "vue");
    Assertions.assertEquals(search1.size(), 7);

    List<Bookmark> search2 = bookmarkDao.getBookmarksBySearchKeywords(userId, "ApI");
    Assertions.assertEquals(search2.size(), 5);
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
    // Create
    BsonObjectId idToDelete = bookmarkDao.addBookmark(testBookmark);
    Assertions.assertNotNull(idToDelete);

    // Delete
    Bookmark deletedBookmark = bookmarkDao.deleteBookmark(idToDelete.getValue().toString());
    Assertions.assertNotNull(deletedBookmark);

    // Make sure it is deleted!
    Bookmark didIDeleteThis = bookmarkDao.getBookmark(idToDelete);
    Assertions.assertNull(didIDeleteThis);
  }
}
