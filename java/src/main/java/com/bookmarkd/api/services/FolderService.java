package com.bookmarkd.api.services;

import com.bookmarkd.api.daos.FolderDao;
import com.bookmarkd.api.models.Folder;
import org.bson.BsonObjectId;
import org.bson.BsonString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Configuration
public class FolderService {

  @Autowired
  private FolderDao folderDao;

  public FolderService() {
    super();
  }

  public List<Folder> getFolders(String id) {
    return folderDao.getFolders(id);
  }

  public Folder getFolder(String id) {
    return folderDao.getFolder(id);
  }

  public Folder addFolder(Folder folder) {
    BsonObjectId id = folderDao.addFolder(folder);
    return folderDao.getFolder(id);
  }

  public Folder replaceFolder(Folder folder, String id) {
    return folderDao.replaceFolder(folder, id);
  }

  public long deleteFolder(String id) {
    return folderDao.deleteFolder(id);
  }


}