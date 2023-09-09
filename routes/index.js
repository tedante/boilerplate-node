const fs = require('fs');
const path = require('path');
const router = require("express").Router()
const Controller = require('../controllers/controller');

router.get("/ping", (req, res) => {
  res.send("ping!")
})
router.get("/", Controller.home)

// Iterate through the files in the 'routes' folder
console.log(fs.readdirSync(__dirname), ">");
fs.readdirSync(__dirname).forEach((file) => {
  if (file.endsWith('.js') && file !== 'index.js') {
    const route = require(`./${file}`);
    const prefix = path.basename(file, '.js'); // Extract the filename without the '.js' extension
    router.use(`/${prefix}`, route); // Mount the route with a dynamic prefix
  }
});

module.exports = router