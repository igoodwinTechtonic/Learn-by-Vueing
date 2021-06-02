// require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')
// const logger = require('morgan')

const routes = require('./routes')

const app = express()

let origin = 'http://localhost:3000'
if (process.env.NODE_ENV === 'production') origin = 'https://learn-by-vueing.herokuapp.com/'
const corsOptions = { origin }
const PORT = process.env.PORT || 3001

// app.use(logger('dev'))
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
if (process.env.NODE_ENV === 'production') app.use(express.static(path.dirname(__dirname) + "/client/dist"))

app.use(routes)

app.listen(PORT, () => console.log('API Server listening on port http://localhost:' + PORT))
