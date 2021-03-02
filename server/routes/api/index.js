const router = require('express').Router();

const { MongoClient, ObjectId } = require('mongodb');

const main = async () => {
  const uri = "mongodb+srv://m001-student:m001-mongodb-basics@sandbox.zutlo.mongodb.net/LBV?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })

  try {
    const mongoClient = await client.connect()
    const db = mongoClient.db('LBV')

    const collection = (path) => {
      return db.collection(path)
    }

    // User routes
    router.route('/users/tags')
      .get(async (req, res) => {
        res.send(await collection('users').findOne({ "username": "iantheg" }, { projection: { tags: 1 } }));
      })
      .put(async (req, res) => {
        // console.log(req.body)
        res.send(await collection('users').updateOne({ "username": "iantheg" }, { "$set": { "tags": req.body } }))
      })

    router.route('/:path')
      // Get all items from path
      .get(async (req, res) => {
        if (req.query.search) {
          // Performs a search if there is a query parameter like /api/folders?search=
          res.send(await collection(req.params.path).find({ "name": { "$regex": req.query.search, "$options": 'i' } }).toArray())
        } else {
          res.send(await collection(req.params.path).find().toArray())
        }
      })
      // Post a new item to the path
      .post(async (req, res) => {
        // console.log(req.body);
        res.send(await collection(req.params.path).insertOne(req.body))
      })

    router.route('/:path/:id')
      // Get one item from the path
      .get(async (req, res) => {
        res.send(await collection(req.params.path).findOne({ "_id": new ObjectId(req.params.id) }))
      })
      // Update an item in the path
      .put(async (req, res) => {
        res.send(await collection(req.params.path).replaceOne({ "_id": new ObjectId(req.params.id) }, req.body))
      })
      // Delete an item PERMANENTLY
      .delete(async (req, res) => {
        res.send(await collection(req.params.path).deleteOne({ "_id": new ObjectId(req.params.id) }))
      })

  } catch (err) {
    console.error(err)
  }
}

main();

module.exports = router;
