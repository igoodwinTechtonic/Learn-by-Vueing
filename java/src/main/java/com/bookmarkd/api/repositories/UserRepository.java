package com.bookmarkd.api.repositories;

import com.bookmarkd.api.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {

}
