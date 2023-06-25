const express = require('express');
const app = express()
const port = 3005

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }))


app.listen(port, () => {
   console.log(`Example app listening on port ${port}`)
})