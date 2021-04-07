package com.bookmarkd.api.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@Document("bookmark")
public class Bookmark {
  @Id
  private String _id;
  private String user_id;
  private String folder_id;
  private String title;
  private String description;
  private String url;
  private String favicon;
  private List<String> tags;
  private Date dateCreated; // Currently set as a string in the db, change to date!

  public Bookmark() { super(); }

  public String getUser_id() {
    return user_id;
  }
  public void setUser_id(String user_id) {
    this.user_id = user_id;
  }

  public String getFolder_id() {
    return folder_id;
  }
  public void setFolder_id(String folder_id) {
    this.folder_id = folder_id;
  }

  public String getTitle() {
    return title;
  }
  public void setTitle(String title) {
    this.title = title;
  }

  public String getDescription() {
    return description;
  }
  public void setDescription(String description) {
    this.description = description;
  }

  public String getUrl() {
    return url;
  }
  public void setUrl(String url) {
    this.url = url;
  }

  public String getFavicon() {
    return favicon;
  }
  public void setFavicon(String favicon) {
    this.favicon = favicon;
  }

  public List<String> getTags() {
    return tags;
  }
  public void setTags(List<String> tags) {
    this.tags = tags;
  }

  public Date getDateCreated() {
    return dateCreated;
  }
  public void setDateCreated(Date dateCreated) {
    this.dateCreated = dateCreated;
  }
}
