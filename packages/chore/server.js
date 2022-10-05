const express = require("express")
const cors = require("cors")
const path = require("path")

const app = express()
const port = parseInt(process.env.PORT || 3002)

app.use(cors())

app.use(express.static(__dirname + "/dist"))

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./dist/index.html"))
})

app.listen(port, () => {
    console.log(`server running on ${port}`)
})