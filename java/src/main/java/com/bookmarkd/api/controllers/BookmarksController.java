package com.bookmarkd.api.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/bookmarks")
public class BookmarksController {

  public void getBookmarks() {}

  public void getBookmarksFromPublicFolder() {}

  public void addBookmark() {}

  public void editBookmark() {}

  public void deleteBookmark() {}

  public void deleteAllBookmarksInFolder() {}

  public void searchBookmarks() {}
}
