package com.bookmarkd;

import com.bookmarkd.api.config.MongoDBConfiguration;
import com.bookmarkd.api.daos.BookmarkDao;
import com.bookmarkd.api.daos.FolderDao;
import com.bookmarkd.api.models.Bookmark;
import com.bookmarkd.api.models.Folder;
import com.mongodb.client.MongoClient;
import org.bson.BsonObjectId;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
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
  private final String userId = "604109a74c3b1cc5f71e9f00";
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

    this.tags.add("Youtube");
    this.tags.add("Testing this tag");
    this.testBookmark = new Bookmark(
            this.userId,
            this.folderId,
            "Test Bookmark",
            "This is a description",
            "https://www.youtube.com/",
            "https://www.mongodb.com/assets/images/global/favicon.ico",
            this.tags,
            (new Date()).toString()
    );
    this.testFolder = folderDao.getFolder("6074c99a32929100155d33d3");
    Assertions.assertNotNull(this.testFolder);
  }

  @Test
  public void AddBookmarkToFolder() {
    BsonObjectId addedBookmarkId = bookmarkDao.addBookmark(this.testBookmark);
    Assertions.assertNotNull(addedBookmarkId);
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
