const router = require('express').Router();

const { MongoClient, ObjectId } = require('mongodb');

const main = async () => {
  // const uri = "mongodb+srv://m001-student:m001-mongodb-basics@sandbox.zutlo.mongodb.net/LBV?retryWrites=true&w=majority";
  const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@sandbox.zutlo.mongodb.net/LBV?retryWrites=true&w=majority`;
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })

  try {
    const mongoClient = await client.connect()
    const db = mongoClient.db('LBV')

    const collection = (path) => {
      return db.collection(path)
    }

    // USER ROUTES ================================================= USER ROUTES //
    const users = 'users'
    router.route('/users/tags')
      // This route is used for updating the whole tag list, including add or removing tags
      .put(async (req, res) => {
        res.send(await collection(users).updateOne({ "_id": new ObjectId(req.body._id) }, { "$set": { "tags": req.body.tags } }))
      })
    router.route('/users/:id')
      // Get data for whole account given the user's email after logging in
      .get(async (req, res) => {
        const response = await collection(users).findOne({ "email": req.params.id })
        if (response) res.send(response)
        // Sends a 202 and null if user is not found, client then makes a POST request to add user
        else res.status(202).send(null)
      })
    router.route('/users')
      .post(async (req, res) => {
        res.send(await collection(users).insertOne(req.body))
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
      // Retrieve a single folder
      .get(async (req, res) => {
        const response = await collection(folders).findOne({ "_id": new ObjectId(req.params.id) })
        if (response) res.send(response)
        else res.status(404).end()
      })
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
            {
              "user_id": req.query.id,
              "$or": [
                { "title": { "$regex": req.query.search, "$options": 'i' } },
                { "siteName": { "$regex": req.query.search, "$options": 'i' } },
                { "description": { "$regex": req.query.search, "$options": 'i' } },
                { "url": { "$regex": req.query.search, "$options": 'i' } },
                { "dateCreated": { "$regex": req.query.search, "$options": 'i' } },
                { "tags": { "$elemMatch": { "$regex": req.query.search, "$options": 'i' } } },
              ]
            }
          ).sort({ "title": 1 }).toArray())
        } else if (req.query.id) {
          // Return all bookmarks if req.query.search is empty
          res.send(await collection(bookmarks).find({ "user_id": req.query.id }).toArray())
        }
      })
      // Post a new item to the path
      .post(async (req, res) => {
        res.send(await collection(bookmarks).insertOne(req.body))
      })

    router.route('/bookmarks/all/:id')
      // Gets all bookmarks from a folder
      .get(async (req, res) => {
        // res.send(await collection(bookmarks).find({ "folder_id": req.params.id }).toArray())
        const response = await collection(bookmarks).find({ "folder_id": req.params.id }).toArray()
        if (response.length !== 0) res.send(response)
        else res.status(404).end()
        // Dead link to test 404
        // http://localhost:3000/folder/public/earth-photos/606775bdd91532ddd76dc871
      })
      // Deletes all bookmarks from a folder
      .delete(async (req, res) => {
        res.send(await collection(bookmarks).deleteMany({ "folder_id": req.params.id }))
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
      // Delete a bookmark PERMANENTLY
      .delete(async (req, res) => {
        res.send(await collection(bookmarks).deleteOne({ "_id": new ObjectId(req.params.id) }))
      })

    // TAG ROUTES ============================================================ TAG ROUTES //
    router.route('/tags')
      .get(async (req, res) => {
        res.send(await collection(bookmarks).find({ "user_id": { "$eq": req.query.id } }).project({ "tags": 1, "_id": 0 }).toArray())
      })

  } catch (err) {
    console.error(err)
  }
}

main();

module.exports = router;
