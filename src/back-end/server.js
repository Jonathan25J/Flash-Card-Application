const express = require('express')
const path = require('path')
const app = express()

const { PORT } = require('../utils')

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})


app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

const cardsRouter = require("./routes/flashCards")

app.use("/", cardsRouter)
