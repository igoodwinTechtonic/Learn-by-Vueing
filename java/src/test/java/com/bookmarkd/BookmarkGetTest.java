package com.bookmarkd;

import com.bookmarkd.api.config.MongoDBConfiguration;
import com.bookmarkd.api.daos.BookmarkDao;
import com.bookmarkd.api.models.Bookmark;
import com.mongodb.client.MongoClient;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

// Tests the Bookmark database layer CRUD operations

@SpringBootTest(classes = {MongoDBConfiguration.class})
@EnableConfigurationProperties
@EnableAutoConfiguration
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class BookmarkGetTest {

  private BookmarkDao bookmarkDao;
  private Bookmark testBookmark;
  private final String userId = "604109a74c3b1cc5f71e9f00";
  private final String vueFolderId = "60679098dcab36e7a7d18b68";

  @Autowired
  MongoClient mongoClient;

  @Value("${spring.mongodb.database}")
  String databaseName;

  @BeforeAll
  public void setup() {
    this.bookmarkDao = new BookmarkDao(mongoClient, databaseName);
    this.testBookmark = new Bookmark();
  }

  @Test
  public void GetBookmarksByUserId() {
    List<Bookmark> bookmarks = bookmarkDao.getBookmarksByUserId(userId);
    Assertions.assertEquals(bookmarks.size(), 8);
  }

  @Test
  public void GetBookmarksByFolderId() {
    List<Bookmark> bookmarks = bookmarkDao.getBookmarksByFolderId(vueFolderId);
    Assertions.assertEquals(bookmarks.size(), 7);
  }

  @Test
  public void GetBookmarksBySearchKeywords() {
    List<Bookmark> search1 = bookmarkDao.getBookmarksBySearchKeywords(userId, "vue");
    Assertions.assertEquals(search1.size(), 7);

    List<Bookmark> search2 = bookmarkDao.getBookmarksBySearchKeywords(userId, "ApI");
    Assertions.assertEquals(search2.size(), 5);
  }
}
