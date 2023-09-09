const express = require('express')
const cors = require('cors')
const routes = require('./routes/index.js');
const { PORT } = require('./config/app.js');

const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use("/", routes)

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})