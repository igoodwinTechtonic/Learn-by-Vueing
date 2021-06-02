package com.bookmarkd.api.controllers;

import com.bookmarkd.api.models.Bookmark;
import com.bookmarkd.api.services.BookmarkService;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/bookmarks")
public class BookmarksController {

  @Autowired
  BookmarkService bookmarkService;

  BookmarksController() { super(); }

  @GetMapping("")
  public ResponseEntity<?> getBookmarksByUserId(@RequestParam(value = "userid") String userId) {
    Map<String, Object> response = new HashMap<>();
    if (userId == null) {
      response.put("status", 400);
      response.put("error", "User id cannot be null or empty");
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }
    List<Bookmark> bookmarks = bookmarkService.getBookmarksByUserId(userId);
    if (bookmarks == null || bookmarks.size() == 0) {
      response.put("status", 404);
      response.put("error", "No bookmarks found");
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
    }
    return ResponseEntity.status(HttpStatus.OK).body(bookmarks);
  }

  @GetMapping("/search")
  public ResponseEntity<?> searchBookmarks(
          @RequestParam(value = "userid") String userId,
          @RequestParam(value = "search") String keywords) {
    Map<String, Object> response = new HashMap<>();
    if (userId == null || userId.isEmpty()) {
      response.put("status", 400);
      response.put("error", "User id cannot be null or empty");
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }
    List<Bookmark> bookmarks = bookmarkService.getBookmarksBySearchKeywords(userId, keywords);
    if (bookmarks == null || bookmarks.size() == 0) {
      response.put("status", 404);
      response.put("error", "No bookmarks found");
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
    }
    return ResponseEntity.status(HttpStatus.OK).body(bookmarks);
  }

  @GetMapping("/all/{id}")
  public ResponseEntity<?> getBookmarksFromPublicFolder(@PathVariable(value = "id") String folderId) {
    Map<String, Object> response = new HashMap<>();
    if (folderId == null || folderId.isEmpty()) {
      response.put("status", 400);
      response.put("error", "Folder id cannot be null or empty");
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }
    List<Bookmark> bookmarks = bookmarkService.getBookmarksByFolderId(folderId);
    if (bookmarks == null || bookmarks.size() == 0) {
      response.put("status", 404);
      response.put("error", "No bookmarks found");
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
    }
    return ResponseEntity.status(HttpStatus.OK).body(bookmarks);
  }

  @DeleteMapping("/all/{id}")
  public ResponseEntity<?> deleteAllBookmarksInFolder(@PathVariable(value = "id") String folderId) {
    Map<String, Object> response = new HashMap<>();
    if (folderId == null || folderId.isEmpty()) {
      response.put("status", 400);
      response.put("error", "Folder id cannot be null or empty");
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }
    long deletedBookmarkCount = bookmarkService.deleteAllBookmarksInFolder(folderId);
    if (deletedBookmarkCount == 0) {
      response.put("status", 404);
      response.put("error", "Folder not found");
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
    }
    response.put("deletedCount", deletedBookmarkCount);
    return ResponseEntity.status(HttpStatus.OK).body(response);
  }

  @GetMapping("/tags")
  public ResponseEntity<?> getTagsByUserId(@RequestParam(value = "userid") String userId) {
    Map<String, Object> response = new HashMap<>();
    if (userId == null || userId.isEmpty()) {
      response.put("status", 400);
      response.put("error", "User id cannot be null or empty");
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }
    Document tags = bookmarkService.getTagsByUserId(userId);
    return ResponseEntity.status(HttpStatus.OK).body(tags);
  }

  @PostMapping("")
  public ResponseEntity<?> addBookmark(@RequestBody Bookmark bookmark) {
    Map<String, Object> response = new HashMap<>();
    if (bookmark == null) {
      response.put("status", 400);
      response.put("error", "Bookmark cannot be null");
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }
    else if (bookmark.getFolder_id() == null || bookmark.getUser_id() == null) {
      response.put("status", 400);
      response.put("error", "Folder id or User id cannot be null");
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }
    else if (bookmark.getFolder_id().isEmpty() || bookmark.getUser_id().isEmpty()) {
      response.put("status", 400);
      response.put("error", "Folder id or User id cannot be empty strings");
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }
    Bookmark addedBookmark = bookmarkService.addBookmark(bookmark);
    return ResponseEntity.status(HttpStatus.OK).body(addedBookmark);
  }

  @PutMapping("/{id}")
  public ResponseEntity<?> editBookmark(
          @PathVariable(value = "id") String bookmarkId,
          @RequestBody Bookmark bookmark) {
    Map<String, Object> response = new HashMap<>();
    if (bookmarkId == null || bookmark == null || bookmarkId.isEmpty()) {
      response.put("status", 400);
      response.put("error", "Bookmark or bookmark id cannot be null");
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }
    Bookmark editedBookmark = bookmarkService.editBookmark(bookmark, bookmarkId);
    return ResponseEntity.status(HttpStatus.OK).body(editedBookmark);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<?> deleteBookmark(@PathVariable(value = "id") String bookmarkId) {
    Map<String, Object> response = new HashMap<>();
    if (bookmarkId == null) {
      response.put("status", 400);
      response.put("error", "bookmarkId cannot be null or empty");
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }
    Bookmark deletedBookmark = bookmarkService.deleteBookmark(bookmarkId);
    return ResponseEntity.status(HttpStatus.OK).body(deletedBookmark);
  }
}
