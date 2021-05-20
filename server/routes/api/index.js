const router = require('express').Router()

const { MongoClient, ObjectId } = require('mongodb')

const main = async () => {
  // const uri = "mongodb+srv://m001-student:m001-mongodb-basics@sandbox.zutlo.mongodb.net/LBV?retryWrites=true&w=majority";
  const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@sandbox.zutlo.mongodb.net/LBV?retryWrites=true&w=majority`
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })

  try {
    const mongoClient = await client.connect()
    const db = mongoClient.db('LBV')

    const collection = (path) => {
      return db.collection(path)
    }

    // USER ROUTES ================================================= USER ROUTES //

    const users = 'users'
    router.route('/users')
      .post(async (req, res) => {
        const existingUser = await collection(users).findOne({ "email": req.body.email, "name": req.body.name })
        if (existingUser) res.send(existingUser)
        else res.send(await collection(users).insertOne(req.body))
      })

    // FOLDER ROUTES ================================================= FOLDER ROUTES //

    const folders = "folders";
    router.route('/folders')
      // Get all folders from path
      .get(async (req, res) => {
        if (req.query.userid) {
          // Searches db for the user's folders given a query parameter: /api/folders?userid=
          res.send(await collection(folders).find({ "user_id": req.query.userid }).toArray())
        }
        else if (req.query.search) {
          res.send(await collection(folders).find(
            { "user_id": req.query.userid },
            { "name": { "$regex": req.query.search, "$options": 'i' } }
          ).toArray())
        }
      })
      // Post a new folder to the path
      .post(async (req, res) => {
        const insertedId = (await collection(folders).insertOne(req.body)).insertedId
        res.send(await collection(folders).findOne({ "_id": new ObjectId(insertedId) }))
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
    router.route('/bookmarks/tags')
      // Returns an array of the user's tags from all bookmarks, not including duplicates
      .get(async (req, res) => {
        const pipeline = [
          {
            '$match': { 'user_id': req.query.userid }
          }, {
            '$group': {
              '_id': 0,
              'tags': { '$push': '$tags' }
            }
          }, {
            '$project': {
              'tags': {
                '$reduce': {
                  'input': '$tags',
                  'initialValue': [],
                  'in': { '$setUnion': ['$$value', '$$this'] }
                }
              },
              '_id': 0
            }
          }
        ]
        res.send(await collection(bookmarks).aggregate(pipeline).next())
      })

    router.route('/bookmarks/search')
      // Get bookmarks items from a search
      .get(async (req, res) => {
        if (req.query.search) {
          // Performs a search if there is a query parameter like /api/bookmarks?search=
          // This endpoint is hit if the user begins typing in the search field
          // Returns all matching bookmarks, sorted by title A-Z
          res.send(await collection(bookmarks).find(
            {
              "user_id": req.query.userid,
              "$or": [
                { "title": { "$regex": req.query.search, "$options": 'i' } },
                { "description": { "$regex": req.query.search, "$options": 'i' } },
                { "url": { "$regex": req.query.search, "$options": 'i' } },
                { "dateCreated": { "$regex": req.query.search, "$options": 'i' } },
                { "tags": { "$elemMatch": { "$regex": req.query.search, "$options": 'i' } } },
              ]
            }
          ).sort({ "title": 1 }).toArray())
        }
      })
    router.route('/bookmarks/all/:id')
      // Gets all bookmarks from a folder
      .get(async (req, res) => {
        const response = await collection(bookmarks).find({ "folder_id": req.params.id }).toArray()
        if (response.length !== 0) res.send(response)
        else res.status(404).end()
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
    router.route('/bookmarks')
      .get(async (req, res) => {
        // Return all bookmarks if req.query.search is empty
        res.send(await collection(bookmarks).find({ "user_id": req.query.userid }).toArray())
      })
      // Post a new item to the path
      .post(async (req, res) => {
        const insertedId = (await collection(bookmarks).insertOne(req.body)).insertedId
        res.send(await collection(bookmarks).findOne({ "_id": new ObjectId(insertedId) }))
      })

  } catch (err) {
    console.error(err)
  }
}

main()

module.exports = router
