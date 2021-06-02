package com.bookmarkd.api.controllers;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

//@RestController
//@Configuration
//@ComponentScan({"config", "entity", "security"})
//public abstract class ApiController {
//
//  @ResponseBody
//  @GetMapping(value = "info")
//  public ResponseEntity<Map> info() {
//    Map<String, String> response = new HashMap<>();
//    response.put("message", "test");
//
//    return ResponseEntity.ok(response);
//  }
//
//  @GetMapping(value = "/")
//  abstract ResponseEntity<Map> index();
//}
