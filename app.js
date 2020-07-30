//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Blogging is to writing what extreme sports are to athletics: more free-form, more accident-prone, less formal, more alive. It is, in many ways, writing out loud.";
const aboutContent = "There's No Us here, It's Just me. Bore marra.. :(";
const contactContent = "Again there is no us, It's just me and nako karo contact.. :D";

const app = express();

let posts = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req,res){
  res.render("home", {
    homeStartingContent:homeStartingContent,
    posts:posts
  });
  
});

app.get("/about", function(req,res){
  res.render("about", {aboutContent:aboutContent});
})

app.get("/contact", function(req,res){
  res.render("contact", {contactContent:contactContent});
})

app.get("/compose", function(req,res){
  res.render("compose");
})

app.post("/compose", function(req,res){
  let inputText = req.body.titleText;

  var post = {
    title: req.body.postTitle,
    content: req.body.postBody
  }

  posts.push(post);

  res.redirect('/');
})

app.get("/posts/:postName", function(req,res){
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.title);

    if (storedTitle === requestedTitle) {
      res.render('post', {
        title: post.title,
        content: post.content
      })
    }
  })
})

app.listen(process.env.PORT || 3000, function(){
  console.log("server is running..");
})