package com.bookmarkd.api.controllers;

import com.bookmarkd.api.models.Login;
import com.bookmarkd.api.models.User;
import com.bookmarkd.api.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(path = "/api/users")
public class UserController {

  @Autowired
  UserService userService;

  public UserController() { super(); }

  /** function authenticateUser()
   * Receives a Login object and returns a User, either from the db or newly created
   *
   * @param login object: email and name fields
   * @return User object: email, name, _id fields
   */
  @PostMapping("")
  public ResponseEntity<?> authenticateUser(@RequestBody Login login) {
    Map<String, Object> response = new HashMap<>();
    if (login == null || login.getEmail() == null || login.getName() == null) {
      response.put("status", 400);
      response.put("error", "Login email and name cannot be null");
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }
    User user = userService.loadUser(login.getEmail());
    // If user is null, create a new one.
    if (user == null) {
      userService.createUser(new User(login.getEmail(), login.getName()));
      User newUser = userService.loadUser(login.getEmail());
      return ResponseEntity.status(HttpStatus.CREATED).body(newUser);
    }
    else {
      return ResponseEntity.status(HttpStatus.OK).body(user);
    }
  }

// // Used to crate a more complicated response body
//  @Override
//  ResponseEntity<Map> index() {
//    return ResponseEntity.ok(Collections.emptyMap());
//  }
  //      Map<String, Object> response = new HashMap<>();
//      response.put("user", user);
}
