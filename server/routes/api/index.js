const router = require('express').Router();

const { MongoClient, ObjectId } = require('mongodb');

let collection;

const main = async () => {
  const uri = "mongodb+srv://m001-student:m001-mongodb-basics@sandbox.zutlo.mongodb.net/LBV?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })

  try {
    const mongoClient = await client.connect()
    const db = mongoClient.db('LBV')

    collection = (path) => {
      return db.collection(path)
    }

    // USER ROUTES ================================================= USER ROUTES //
    router.route('/users/tags')
      // This route is used for updating the whole tag list, including add or removing tags
      .put(async (req, res) => {
        res.send(await collection('users').updateOne({ "_id": new ObjectId(req.body._id) }, { "$set": { "tags": req.body.tags } }))
      })
    router.route('/users/:id')
      // Get data for whole account given the user's email after logging in
      .get(async (req, res) => {
        const response = await collection('users').findOne({ "email": req.params.id })
        if (response) res.send(response)
        // Sends a 202 and null if user is not found, client then makes a POST request to add user
        else res.status(202).send(null)
      })
    router.route('/users')
      .post(async (req, res) => {
        res.send(await collection('users').insertOne(req.body))
      })
    // FOLDER ROUTES ================================================= FOLDER ROUTES //
    const folders = "folders";
    router.route('/folders')
      // Get all folders from path
      .get(async (req, res) => {
        if (req.query.id) {
          // Searches db for the user's folders given a query parameter: /api/folders?id=
          res.send(await collection(folders).find({ "user_id": req.query.id }).toArray())
        }
        else if (req.query.search) {
          res.send(await collection(folders).find(
            { "user_id": req.query.id },
            { "name": { "$regex": req.query.search, "$options": 'i' } }
          ).toArray())
        }
      })
      // Post a new folder to the path
      .post(async (req, res) => {
        res.send(await collection(folders).insertOne(req.body))
      })
    router.route('/folders/:id')
      // Update an folder name given folder id
      .put(async (req, res) => {
        res.send(await collection(folders).replaceOne({ "_id": new ObjectId(req.params.id) }, req.body))
      })
      // Delete a folder PERMANENTLY
      .delete(async (req, res) => {
        res.send(await collection(folders).deleteOne({ "_id": new ObjectId(req.params.id) }))
      })

    // BOOKMARK ROUTES ================================================= BOOKMARK ROUTES //
    const bookmarks = "bookmarks"
    router.route('/bookmarks')
      // Get all items from path
      .get(async (req, res) => {
        if (req.query.search) {
          // Performs a search if there is a query parameter like /api/bookmarks?search=
          // This endpoint is hit if the user begins typing in the search field
          res.send(await collection(bookmarks).find(
            { "user_id": req.query.id },
            {
              "$or": [
                { "title": { "$regex": req.query.search, "$options": 'i' } },
                { "siteName": { "$regex": req.query.search, "$options": 'i' } },
                { "description": { "$regex": req.query.search, "$options": 'i' } },
                { "url": { "$regex": req.query.search, "$options": 'i' } },
                { "dateCreated": { "$regex": req.query.search, "$options": 'i' } },
                // CREATE LOGIC TO QUERY TAGS!
              ]
            }
          ).toArray())
        } else {
          res.send(await collection(bookmarks).find().toArray())
        }
      })
      // Post a new item to the path
      .post(async (req, res) => {
        // console.log(req.body);
        res.send(await collection(bookmarks).insertOne(req.body))
      })

    router.route('/bookmarks/:id')
      // Get all bookmarks from the path
      .get(async (req, res) => {
        res.send(await collection(bookmarks).findOne({ "_id": new ObjectId(req.params.id) }))
      })
      // Update a bookmark
      .put(async (req, res) => {
        res.send(await collection(bookmarks).replaceOne({ "_id": new ObjectId(req.params.id) }, req.body))
      })
      // Delete an item PERMANENTLY
      .delete(async (req, res) => {
        res.send(await collection(bookmarks).deleteOne({ "_id": new ObjectId(req.params.id) }))
      })






    // router.route('/:path/:model?id')
    //   // Get all items from path
    //   .get(async (req, res) => {
    //     // if (req.query.search) {
    //     //   // Performs a search if there is a query parameter like /api/folders?search=
    //     //   res.send(await collection(req.params.path).find({ "name": { "$regex": req.query.search, "$options": 'i' } }).toArray())
    //     // }
    //     console.log(req.params)
    //     if (req.params.path === 'users') {
    //       const response = await collection('users').findOne({ "email": req.params.model })
    //       if (response) res.send(response)
    //       // Send code 202 to tell front-end to POST a new user
    //       else res.status(202).send(null)
    //     }
    //     else if (req.params.path === 'folders' && req.query.id) {
    //       res.send(await collection(req.params.path).find({ "user_id": { "$regex": req.query.id, "$options": 'i' } }).toArray())
    //     }
    //   })
    //   // Post a new item to the path
    //   .post(async (req, res) => {
    //     // console.log(req.body);
    //     res.send(await collection(req.params.path).insertOne(req.body))
    //   })












    // User routes
    // router.route('/users/tags')
    //   .get(async (req, res) => {
    //     res.send(await collection('users').findOne({ "username": "iantheg" }, { projection: { tags: 1 } }));
    //   })
    //   .put(async (req, res) => {
    //     // console.log(req.body)
    //     res.send(await collection('users').updateOne({ "username": "iantheg" }, { "$set": { "tags": req.body } }))
    //   })
    // router.route('/users/:email')
    //   .get(async (req, res) => {
    //     const response = await collection('users').findOne({ "email": req.params.email })
    //     if (response) res.send(response)
    //     else res.status(202).send(null)
    //   })

    // router.route('/:path')
    //   // Get all items from path
    //   .get(async (req, res) => {
    //     if (req.query.search) {
    //       // Performs a search if there is a query parameter like /api/folders?search=
    //       res.send(await collection(req.params.path).find({ "name": { "$regex": req.query.search, "$options": 'i' } }).toArray())
    //     } else {
    //       res.send(await collection(req.params.path).find().toArray())
    //     }
    //   })
    //   // Post a new item to the path
    //   .post(async (req, res) => {
    //     // console.log(req.body);
    //     res.send(await collection(req.params.path).insertOne(req.body))
    //   })

    // router.route('/:path/:id')
    //   // Get one item from the path
    //   .get(async (req, res) => {
    //     res.send(await collection(req.params.path).findOne({ "_id": new ObjectId(req.params.id) }))
    //   })
    //   // Update an item in the path
    //   .put(async (req, res) => {
    //     res.send(await collection(req.params.path).replaceOne({ "_id": new ObjectId(req.params.id) }, req.body))
    //   })
    //   // Delete an item PERMANENTLY
    //   .delete(async (req, res) => {
    //     res.send(await collection(req.params.path).deleteOne({ "_id": new ObjectId(req.params.id) }))
    //   })

  } catch (err) {
    console.error(err)
  }
}

main();

module.exports = router;
