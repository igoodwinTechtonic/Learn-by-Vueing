package com.bookmarkd.api.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.bson.Document;
import org.bson.codecs.pojo.annotations.BsonId;
import org.bson.codecs.pojo.annotations.BsonIgnore;
import org.bson.types.ObjectId;
//import org.springframework.data.mongodb.core.mapping.Document;

//@Document("users")
public class User {

  @BsonId // Sets oid as the ObjectId when inserting into Mongo
  @JsonIgnore // Does not return oid to app
  private ObjectId oid;

  @JsonProperty("_id") // Returns _id as a string to app
  @BsonIgnore // Does not insert into Mongo
  private String id;

  private String email;
  private String name;

  public User() { super(); }

  public User(String email, String name) {
    super();
    this.email = email;
    this.name = name;
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

  public String getEmail() {
    return email;
  }
  public void setEmail(String email) {
    this.email = email;
  }

  public String getName() {
    return name;
  }
  public void setName(String name) {
    this.name = name;
  }
}
