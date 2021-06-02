package com.bookmarkd.api.services;

import com.bookmarkd.api.daos.UserDao;
import com.bookmarkd.api.models.Login;
import com.bookmarkd.api.models.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Service;

@Service
@Configuration
public class UserService {

  @Autowired
  private UserDao userDao;

  public UserService() { super(); }

  // Calls userDao to add user to users collection
  public User createUser(User newUser) {
    return userDao.addUser(newUser) ? userDao.getUser(newUser.getEmail()) : null;
  }

  // Calls userDao to get user from users collection
  public User loadUser(String email) {
    return userDao.getUser(email);
  }

}
