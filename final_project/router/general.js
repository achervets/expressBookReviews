const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;

  if(username && password) {
    if(users.filter((username)=> {
        return username.username === username;
    }).length > 0) {
        return res.status(404).json({message: 'User Already Exists'});
    } else {
        users.push({"username": username, "password":password});
        return res.status(200).json({message: 'User Added'});
    }
  }
  return res.status(404).json({message: 'Username or password not provided'});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  let myPromise = new Promise((resolve,reject) => {
    setTimeout(() => {
        res.send(JSON.stringify(books, null, 4));
        resolve("Promise resolved")
    },2000)})
  
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  let myPromise = new Promise((resolve,reject) => {
    setTimeout(() => {
        const isbn = req.params.isbn;
        res.send(books[isbn]);
        resolve("Promise resolved")
    },2000)})
  
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  let myPromise = new Promise((resolve,reject) => {
    setTimeout(() => {
        const author = req.params.author;
    const keyList = Object.keys(books);
    for(let key of keyList) {
        if(author === books[key].author) {
            res.send(books[key]);
        }
    }
    res.send('author not found');
    resolve("Promise resolved")
    },2000)})
    
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  let myPromise = new Promise((resolve,reject) => {
    setTimeout(() => {
        const title = req.params.title;
    const keyList = Object.keys(books);
    for(let key of keyList) {
        if(title === books[key].title) {
            res.send(books[key]);
        }
    }
    res.send('title not found');
    resolve("Promise resolved")
    },2000)})
  
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  res.send(books[isbn].reviews);
});

module.exports.general = public_users;
