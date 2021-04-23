package com.bookmarkd.api.services;

import com.bookmarkd.api.daos.BookmarkDao;
import com.bookmarkd.api.models.Bookmark;
import org.bson.BsonObjectId;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Configuration
public class BookmarkService {

  @Autowired
  BookmarkDao bookmarkDao;

  public BookmarkService() { super(); }

  public List<Bookmark> getBookmarksByUserId(String id) {
    return bookmarkDao.getBookmarksByUserId(id);
  }

  public List<Bookmark> getBookmarksByFolderId(String id) {
    return bookmarkDao.getBookmarksByFolderId(id);
  }

  public List<Bookmark> getBookmarksBySearchKeywords(String userId, String keywords) {
    return bookmarkDao.getBookmarksBySearchKeywords(userId, keywords);
  }

  public Document getTagsByUserId(String id) {
    return bookmarkDao.getTagsByUserId(id);
  }

  public Bookmark addBookmark(Bookmark bookmark) {
    BsonObjectId insertedId = bookmarkDao.addBookmark(bookmark);
    return bookmarkDao.getBookmark(insertedId);
  }

  public Bookmark editBookmark(Bookmark bookmark, String bookmarkId) {
    boolean executedSuccessfully = bookmarkDao.replaceBookmark(bookmark, bookmarkId);
    if (executedSuccessfully) return bookmarkDao.getBookmark(bookmarkId);
    else return null;
  }

  public Bookmark deleteBookmark(String bookmarkId) {
    return bookmarkDao.deleteBookmark(bookmarkId);
  }

  public long deleteAllBookmarksInFolder(String folderId) {
    return bookmarkDao.deleteAllBookmarksInFolder(folderId);
  }
}
