package com.bookmarkd.api.services;

import com.bookmarkd.api.models.User;
import com.bookmarkd.api.repositories.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {

  private final UserRepository userRepository;

  public UserService(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  public void getUser() {}

  public void postUser(User user) {
    userRepository.insert(user);
  }
}
