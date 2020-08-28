const express = require('express')
const nunjucks = require('nunjucks')

const server = express ()
const videos = require("./data")

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express:server,
    autoescape: false,
    noCache: true

})

server.get("/", function(req, res) {
     const about = {
         avatar_url: "https://scontent.fgel3-1.fna.fbcdn.net/v/t1.0-9/27545230_1672258089505906_6915333381547939712_n.jpg?_nc_cat=107&_nc_sid=09cbfe&_nc_ohc=iZiS-QSTl-AAX8-it5Q&_nc_ht=scontent.fgel3-1.fna&oh=ae24c9d44ae865fb99736a3db1cb07fc&oe=5F59EB00",
         name: "Marco Aurélio",
         role: "Instrutor de windows server 2019",
         description: "Instrutor MVP da microsoft",
         links: [
             { name: "Github", url: "https://github.com/mmmarco9"},
             { name: "Twitter", url: "https://twitter.com/mmmarco9"},
             { name: "Linkedin", url: "https://www.linkedin.com/in/marco-aur%C3%A9lio-cardoso-a5680793/"}
           ]
     }


    return res.render("about", {about})
} )

server.get("/portfolio", function(req, res) {

    return res.render("portfolio", { items: videos })
} )

server.get("/video", function(req, res) {
    const id = req.query.id

    const video = videos.find(function(video) {
        if (video.id == id) {
            return true
        }
    })

    if (!video) {
        return res.send("video not found!")
    }

    return res.render("video", { item: video})
}) 
    


server.listen(5000, function () {
    console.log("server is running")

})