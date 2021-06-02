package com.bookmarkd.api.controllers;

import com.bookmarkd.api.models.Link;
import com.bookmarkd.api.services.BookmarkService;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/scrape")
public class ScrapeController {

  /* Scraped bookmark with link-preview-js. All fields are strings.
  {
    description: "",
    favicon: "",
    title: "",
    url: ""
  }
   */

  @Autowired
  BookmarkService bookmarkService;

  ScrapeController() { super(); }

  @PostMapping("")
  public ResponseEntity<?> scrapeUrl(@RequestBody Link link) {
    Map<String, Object> response = new HashMap<>();
    if (link.getLink().isEmpty()) {
      response.put("status", 400);
      response.put("error", "Url cannot be null or empty");
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

    try {
      Document webpage = Jsoup.connect(link.getLink()).get();
      String title = "";
      String description = "";
      String favicon = "";

      Elements ogTitle = webpage.getElementsByAttributeValueContaining("property", "og:title");
      if (ogTitle != null) title = ogTitle.attr("content");
      else {
        Elements h1Elements = webpage.getElementsByTag("h1");
        if (h1Elements != null) title = h1Elements.first().wholeText();
        else title = webpage.title();
      }

      Elements ogDesc = webpage.getElementsByAttributeValueContaining("property", "og:description");
      if (ogDesc == null) {
        Elements metaDesc = webpage.head().select("meta[name=description)");
        if (metaDesc != null) description = metaDesc.attr("content");
      }
      else description = ogDesc.attr("content");

      Elements faviconElements = webpage.head().select("link[href~=.*\\.(ico|png)]");
      if (faviconElements == null) {
        Element element = webpage.head().select("meta[itemprop=image]").first();
        if (element != null) favicon = element.attr("content");
      }
      else favicon = faviconElements.attr("abs:href");
//      System.out.println(favicon);

      response.put("description", description);
      response.put("favicon", favicon);
      response.put("title", title);
      response.put("url", link.getLink());
    } catch (IOException e) {
      e.printStackTrace();
    }

    return ResponseEntity.status(HttpStatus.OK).body(response);
  }
}
