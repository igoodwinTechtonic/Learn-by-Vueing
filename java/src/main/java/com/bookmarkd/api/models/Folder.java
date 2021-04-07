package com.bookmarkd.api.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("folder")
public class Folder {
  @Id
  private String _id;
  private String user_id;
  private String name;
  private String icon;
  private boolean shareable;

  public Folder() { super(); }

  public String getUser_id() {
    return user_id;
  }
  public void setUser_id(String user_id) {
    this.user_id = user_id;
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
}
