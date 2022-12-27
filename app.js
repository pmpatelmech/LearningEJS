const express = require("express")
const app = express()
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: true }))
const ejs = require("ejs")
app.set("view engine", "ejs")
app.use(express.static("public"))
const date=require(__dirname + "/date.js")


const items = []
const workItems=[]
app.get("/", (req, res) => {
    const day=date.getDate()
    res.render("index", { listTitle: day,newItems:items })
})

app.post("/", (req, res) => {
    if (req.body.list === "Work") {
        workItems.push(req.body.newItem)
        res.redirect("/work")
    }else{
        items.push(req.body.newItem)
        res.redirect("/")
        }
})

app.get("/work", (req, res) => {
    res.render("index",{listTitle:"Work List",newItems:workItems})
})

app.post("/work", (req, res) => {
    workItems.push(req.body.newItem)
    res.redirect("/work")
})

app.get("/about", (req, res) => {
    res.render("about")
})

app.listen(3000,()=>{console.log("listening 3000");})