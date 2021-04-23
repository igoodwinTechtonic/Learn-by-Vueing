# Thought I was going to use this, but didn't

## Now I want to hold onto this logic cuz it took me forever to figure out

Getting tags to update in a silly but complicated way:

```js
// In tags module:
getTags({ commit }) {
  return axios.get('/api/users/tags')
    .then((res) => commit('setTags', res.data.tags))
    .catch((err) => console.error(err))
},
POSTS new tags and/or UPDATES count of existing tags from the AddBookmark.vue dialog
updateTagList({ commit, state, rootState }) {
  let updatedTags = [...state.currentBookmarkTags];
  state.list.forEach(tagInState => {
    if (!(updatedTags.map(tag => tag.name).includes(tagInState.name))) {
      // If a tag in state is not in currentBookmarkTags, keep it the same and readd to list
      updatedTags = [...updatedTags, tagInState]
    }
  })
  commit('setTags', updatedTags)

  const putTags = {
    _id: rootState.users.currentUser._id,
    tags: updatedTags
  }

  return axios
    .put('/api/users/tags', putTags)
    .then(() => commit('setTags', updatedTags))
    .catch((err) => console.error(err));
},

```

The other half of the logic to mess with tags:

```js
// Set tag list in state, tags are posted to db in parent component, AddBookmark, when bookmark is submitted
setTags() {
  const updatedTags = this.chips.map((tag) => {
    if (this.items.includes(tag)) {
      let tagCountToIncrement = this.$store.state.tags.list.find((tagInState) => tagInState.name === tag).count;
      // If the tag is in state.list, don't add, increase count by 1
      return { name: tag, count: (tagCountToIncrement += 1) };
    }
    // If the tag is not in state.list, add a new object { name: tag, count: 1 }
    return { name: tag, count: 1 };
  });
  this.$store.commit('tags/setCurrentBookmarkTags', this.chips);
```

Sorts tags alphabetically by name

```js
sortedTags(tags) {
  if (tags.length === 0) return [];
  else if (tags.length === 1) return tags;
  else {
    // Prevents infinite loop because of changing tags by reference
    const sortedTags = [...tags];
    sortedTags.sort((a, b) => {
      let tagA = a.toUpperCase();
      let tagB = b.toUpperCase();
      return tagA < tagB ? -1 : tagA > tagB ? 1 : 0;
    });
    return sortedTags;
  }
},
```

Sets a ref and focus on the add/edit button when the component loads

```js
mounted() {
  this.$refs.btn.$el.focus();
},
updated() {
  this.$refs.btn.$el.focus();
},
```

```js
db.bookmarks.find({
  user_id: '604109a74c3b1cc5f71e9f00',

  $or: [
    { title: { $regex: 'vue', $options: 'i' } },
    { siteName: { $regex: 'vue', $options: 'i' } },
    { description: { $regex: 'vue', $options: 'i' } },
    { url: { $regex: 'vue', $options: 'i' } },
    { dateCreated: { $regex: 'vue', $options: 'i' } },
  ],
});
```

## Bug post on mongo university

I'm attempting to build my own application and backend API to further my understanding of the Mongo Java driver after completing the M220J course, but am running into a blocker.

I'm creating a bookmark managing app and rebuilding the backend in Java using Mongo and Spring Boot. The error appears when using `.iterator()` or `.into()` after `.find()` to query my Atlas database. The error DOES NOT APPEAR when using `.first()` after `.find()`.

My `pom.xml` includes version 4.2.2 of mongodb-driver-sync.

In the code, the `user_id` field is stored as a String, not ObjectId, in the Folder documents (acts like a foreign key) This does not cause the error. The `.into()` trick was taken from [this article talking about Mongo and Java Pojos](https://developer.mongodb.com/quickstart/java-setup-crud-operations/?utm_campaign=javainsertingdocuments&utm_source=facebook&utm_medium=organic_social#lists).

```java
  // Returns an array of folders, given a user id
  public List<Folder> getFolders(String id) {
    if (id == null || id.isEmpty()) return null;
    List<Folder> folders = foldersCollection.find(new Document("user_id", id)).into(new ArrayList<>());
    return folders;
  }
```

This code also does not work, which uses `.iterator()` after `.find()`.

```java
  public List<Folder> getFolders(String id) {
    if (id == null || id.isEmpty()) return null;
    List<Folder> folders = new ArrayList<>();
    foldersCollection.find(new Document("user_id", id)).iterator().forEachRemaining(folders::add);
    return folders;
  }
```

I have verified that <i>this code works</i> with a test in Java and in Postman:

```java
  // Gets a folder from db given folder _id
  public Folder getFolder(String id) {
    if (id == null || id.isEmpty()) return null;
    return foldersCollection.find(new Document("_id", new ObjectId(id))).first();
  }
```

<h2>This is the error:</h2>

```java

java.lang.NoSuchMethodError: 'com.mongodb.internal.operation.ExplainableReadOperation com.mongodb.internal.operation.SyncOperations.find(org.bson.conversions.Bson, java.lang.Class, com.mongodb.internal.client.model.FindOptions)'

	at com.mongodb.client.internal.FindIterableImpl.asReadOperation(FindIterableImpl.java:236)
	at com.mongodb.client.internal.FindIterableImpl.asReadOperation(FindIterableImpl.java:40)
	at com.mongodb.client.internal.MongoIterableImpl.execute(MongoIterableImpl.java:135)
	at com.mongodb.client.internal.MongoIterableImpl.iterator(MongoIterableImpl.java:92)
	at com.mongodb.client.internal.MongoIterableImpl.forEach(MongoIterableImpl.java:121)
	at com.mongodb.client.internal.MongoIterableImpl.into(MongoIterableImpl.java:130)
	at com.bookmarkd.api.daos.FolderDao.getFolders(FolderDao.java:46)
    at com.bookmarkd.FolderTest.GetFolders(FolderTest.java:50) <31 internal lines>
    at java.base/java.util.ArrayList.forEach(ArrayList.java:1511) <9 internal lines>
    at java.base/java.util.ArrayList.forEach(ArrayList.java:1511) <23 internal lines>
```

---

For more context, the `foldersCollection` is declared with a Pojo codec in the same exact way the UserDao.java file is from the M220J course. This enables me to use the Folder object instead of Document.

```java
@Configuration
public class FolderDao extends AbstractBookmarkdDao {

  private final MongoCollection<Folder> foldersCollection;

  @Autowired
  public FolderDao(MongoClient mongoClient, @Value("${spring.mongodb.database}") String databaseName) {
    super(mongoClient, databaseName);

    CodecRegistry pojoCodecRegistry = fromRegistries(
            MongoClientSettings.getDefaultCodecRegistry(),
            fromProviders(PojoCodecProvider.builder().automatic(true).build())
    );
    foldersCollection = db
            .getCollection("folders", Folder.class)
            .withWriteConcern(WriteConcern.MAJORITY)
            .withCodecRegistry(pojoCodecRegistry);
  }

    // DAO methods to CRUD Folders
    // getFolders
    // getFolder
    // addFolder ...
}
```



Document{{queryPlanner=Document{{plannerVersion=1, namespace=LBV.bookmarks, indexFilterSet=false, parsedQuery=Document{{$and=[Document{{$or=[Document{{description=Document{{$eq=Document{{mongo=BsonRegularExpression{pattern='i', options=''}}}}}}}, Document{{title=Document{{$eq=Document{{mongo=BsonRegularExpression{pattern='i', options=''}}}}}}}]}}, Document{{user_id=Document{{$eq=6065e0a16fca1f8ee47b7a73}}}}]}}, optimizedPipeline=true, winningPlan=Document{{stage=SORT, sortPattern=Document{{title=1}}, memLimit=33554432, type=simple, inputStage=Document{{stage=COLLSCAN, filter=Document{{$and=[Document{{$or=[Document{{description=Document{{$eq=Document{{mongo=BsonRegularExpression{pattern='i', options=''}}}}}}}, Document{{title=Document{{$eq=Document{{mongo=BsonRegularExpression{pattern='i', options=''}}}}}}}]}}, Document{{user_id=Document{{$eq=6065e0a16fca1f8ee47b7a73}}}}]}}, direction=forward}}}}, rejectedPlans=[]}}, executionStats=Document{{executionSuccess=true, nReturned=0, executionTimeMillis=0, totalKeysExamined=0, totalDocsExamined=16, executionStages=Document{{stage=SORT, nReturned=0, executionTimeMillisEstimate=0, works=19, advanced=0, needTime=18, needYield=0, saveState=0, restoreState=0, isEOF=1, sortPattern=Document{{title=1}}, memLimit=33554432, type=simple, totalDataSizeSorted=0, usedDisk=false, inputStage=Document{{stage=COLLSCAN, filter=Document{{$and=[Document{{$or=[Document{{description=Document{{$eq=Document{{mongo=BsonRegularExpression{pattern='i', options=''}}}}}}}, Document{{title=Document{{$eq=Document{{mongo=BsonRegularExpression{pattern='i', options=''}}}}}}}]}}, Document{{user_id=Document{{$eq=6065e0a16fca1f8ee47b7a73}}}}]}}, nReturned=0, executionTimeMillisEstimate=0, works=18, advanced=0, needTime=17, needYield=0, saveState=0, restoreState=0, isEOF=1, direction=forward, docsExamined=16}}}}, allPlansExecution=[]}}, serverInfo=Document{{host=sandbox-shard-00-01.zutlo.mongodb.net, port=27017, version=4.4.4, gitVersion=8db30a63db1a9d84bdcad0c83369623f708e0397}}, ok=1.0, $clusterTime=Document{{clusterTime=Timestamp{value=6950366389081210887, seconds=1618258280, inc=7}, signature=Document{{hash=org.bson.types.Binary@34449eab, keyId=6922211967922864131}}}}, operationTime=Timestamp{value=6950366389081210887, seconds=1618258280, inc=7}}}
