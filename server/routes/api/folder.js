const router = require('express').Router();

const { MongoClient, ObjectId } = require('mongodb');

const main = async () => {
  const uri = "mongodb+srv://m001-student:m001-mongodb-basics@sandbox.zutlo.mongodb.net/LBV?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })

  try {
    const mongoClient = await client.connect();
    const db = mongoClient.db('LBV')
    const foldersCollection = db.collection('folders')

    router.route('/')
      // Get all folders
      .get(async (req, res) => {
        if (req.query.search) {
          // Performs a search if there is a query parameter like /api/folders?search=
          res.send(await foldersCollection.find({ "name": { "$regex": req.query.search, "$options": 'i' } }).toArray())
        } else {
          res.send(await foldersCollection.find().toArray())
        }
      })
      // Post a new folder
      .post(async (req, res) => {
        res.send(await foldersCollection.insertOne(req.body))
      })

    router.route('/:id')
      // Get one folder
      .get(async (req, res) => {
        res.send(await foldersCollection.findOne({ "_id": ObjectId(req.params.id) }))
      })
      // Update a folder
      .put(async (req, res) => {
        res.send(await foldersCollection.replaceOne({ "_id": ObjectId(req.params.id) }, req.body))
      })
      // Delete a folder PERMANENTLY
      .delete(async (req, res) => {
        res.send(await foldersCollection.deleteOne({ "_id": ObjectId(req.params.id) }))
      })

  } catch (err) {
    console.error(err)
  }
}

main();

module.exports = router;
