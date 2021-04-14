package com.bookmarkd.api.config;

import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.WriteConcern;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import org.bson.codecs.configuration.CodecRegistry;
import org.bson.codecs.pojo.PojoCodecProvider;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

import static org.bson.codecs.configuration.CodecRegistries.fromProviders;
import static org.bson.codecs.configuration.CodecRegistries.fromRegistries;

// Used to configure connection to Atlas cluster
@Configuration
@Service
public class MongoDBConfiguration {

  @Bean
  @Scope(value = ConfigurableBeanFactory.SCOPE_SINGLETON)
  public MongoClient mongoClient(@Value("${spring.mongodb.uri}") String connectionString) {

    CodecRegistry pojoCodecRegistry = fromRegistries(
            MongoClientSettings.getDefaultCodecRegistry(),
            fromProviders(PojoCodecProvider.builder().automatic(true).build())
    );

    ConnectionString connString = new ConnectionString(connectionString);
    WriteConcern writeConcern = WriteConcern.MAJORITY; //.withWTimeout(2500, TimeUnit.MILLISECONDS);
    MongoClientSettings settings = MongoClientSettings.builder()
            .writeConcern(writeConcern)
            .applyConnectionString(connString)
            .codecRegistry(pojoCodecRegistry)
            .build();
    MongoClient mongoClient = MongoClients.create(settings);

    return mongoClient;
  }
}
