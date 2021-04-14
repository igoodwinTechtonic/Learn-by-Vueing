package com.bookmarkd.api.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.bson.codecs.pojo.annotations.BsonId;
import org.bson.codecs.pojo.annotations.BsonIgnore;
import org.bson.types.ObjectId;

import java.util.Date;
import java.util.List;

public class Bookmark {

  @BsonId
  @JsonIgnore
  private ObjectId oid;

  @JsonProperty("_id")
  @BsonIgnore
  private String id;

  @JsonProperty("user_id")
  private String userId;

  @JsonProperty("folder_id")
  private String folderId;

  private String title;
  private String description;
  private String url;
  private String favicon;
  private List<String> tags;
  private String dateCreated; // Currently set as a string in the db, change to date!

  public Bookmark() { super(); }

  public Bookmark(
          String userId, String folderId,
          String title, String description, String url, String favicon,
          List<String> tags, String dateCreated) {
    super();
    this.userId = userId;
    this.folderId = folderId;
    this.title = title;
    this.description = description;
    this.url = url;
    this.favicon = favicon;
    this.tags = tags;
    this.dateCreated = dateCreated;
  }


  public ObjectId getOid() {
    return oid;
  }
  public void setOid(ObjectId oid) {
    this.oid = oid;
    this.id = oid.toHexString();
  }

  public String getId() { return this.id; }
  public void setId(String id) {
    this.id = id;
    this.oid = new ObjectId(id);
  }

  public String getUser_id() {
    return userId;
  }
  public void setUser_id(String user_id) {
    this.userId = user_id;
  }

  public String getFolder_id() {
    return folderId;
  }
  public void setFolder_id(String folder_id) {
    this.folderId = folder_id;
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

  public String getDateCreated() {
    return dateCreated;
  }
  public void setDateCreated(String dateCreated) {
    this.dateCreated = dateCreated;
  }
}
