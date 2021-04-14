package com.bookmarkd.api.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.bson.codecs.pojo.annotations.BsonId;
import org.bson.codecs.pojo.annotations.BsonIgnore;
import org.bson.types.ObjectId;

public class Folder {

  @BsonId
  @JsonIgnore
  private ObjectId oid;

  @JsonProperty("_id")
  @BsonIgnore
  private String id;

  @JsonProperty("user_id")
  private String userId;

  private String name;
  private String icon;
  private boolean shareable;

  public Folder() { super(); }

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

  public String getName() {
    return name;
  }
  public void setName(String name) {
    this.name = name;
  }

  public String getIcon() {
    return icon;
  }
  public void setIcon(String icon) {
    this.icon = icon;
  }

  public boolean isShareable() {
    return shareable;
  }
  public void setShareable(boolean shareable) {
    this.shareable = shareable;
  }

  @Override
  public String toString() {
    return this.oid.toString() + " " + this.id + " " + this.userId + " " + this.name + " " + this.icon;
  }
}
