package com.bookmarkd.api.controllers;

import com.bookmarkd.api.models.Folder;
import com.bookmarkd.api.services.FolderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/folders")
public class FolderController {

  @Autowired
  FolderService folderService;

  public FolderController() { super(); }

  // Used to retrieve a public folder, given the folder _id
  @GetMapping("")
  public ResponseEntity<?> getFoldersByUserId(@RequestParam(value = "userid", required = false) String id) {
    Map<String, Object> response = new HashMap<>();
    if (id == null) {
      response.put("status", 400);
      response.put("error", "id cannot be null");
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }
    List<Folder> folders = folderService.getFolders(id);
    if (folders == null) {
      response.put("status", 404);
      response.put("error", "Folders for user not found");
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
    }
    return ResponseEntity.status(HttpStatus.OK).body(folders);
  }

  // Used to retrieve a public folder, given the folder id
  @GetMapping("/{id}")
  public ResponseEntity<?> getFolder(@PathVariable(value = "id") String id) {
    Map<String, Object> response = new HashMap<>();
    if (id == null) {
      response.put("status", 400);
      response.put("error", "id cannot be null");
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }
    Folder folder = folderService.getFolder(id);
    if (folder == null) {
      response.put("status", 404);
      response.put("error", "Folder not found");
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
    }
    return ResponseEntity.status(HttpStatus.OK).body(folder);
  }

  // Used to add a folder to the database
  @PostMapping("")
  public ResponseEntity<?> addFolder(@RequestBody Folder folder) {
    Map<String, Object> response = new HashMap<>();
    if (folder == null) {
      response.put("status", 400);
      response.put("error", "Folder cannot be null");
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }
    Folder insertedFolderWithId = folderService.addFolder(folder);
    return ResponseEntity.status(HttpStatus.CREATED).body(insertedFolderWithId);
  }

  // Used to update / replace a folder by folder id
  // Note: Incoming folder DOES NOT HAVE _id field, but returned updatedFolder has _id
  @PutMapping("/{id}")
  public ResponseEntity<?> updateFolder(@PathVariable(value = "id") String id, @RequestBody Folder folder) {
    Map<String, Object> response = new HashMap<>();
    if (folder == null || id == null) {
      response.put("status", 400);
      response.put("error", "Folder or id cannot be null");
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }
    Folder updatedFolder = folderService.replaceFolder(folder, id);
    return ResponseEntity.status(HttpStatus.OK).body(updatedFolder);
  }

  // Used to delete a folder db by folder id
  @DeleteMapping("/{id}")
  public ResponseEntity<?> deleteFolder(@PathVariable(value = "id") String id) {
    Map<String, Object> response = new HashMap<>();
    if (id == null) {
      response.put("status", 400);
      response.put("error", "id cannot be null");
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }
    if (folderService.deleteFolder(id) > 0) {
      return ResponseEntity.status(HttpStatus.OK).build();
    } else {
      response.put("status", 404);
      response.put("error", "Folder not found");
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
    }
  }
}
