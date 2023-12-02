// Import necessary modules and libraries
import express from "express";
import cors from "cors";
import crypto from 'crypto'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

// Define a Mongoose model for User
const User = mongoose.model('User', {
  name:{
    type: String,
    unique: true
  },
  password:{
    type: String,
    required: true
  },
  accessToken:{
    type: String,
    default: () => crypto.randomBytes(128).toString('hex')
  }
})

// Create a new User instance with name "Bob" and hashed password "foobar"
const user = new User({name: "Bob", password: bcrypt.hashSync("foobar")})
user.save()

// Set up Express app
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares for CORS and JSON body parsing
app.use(cors());
app.use(express.json());

// Define a simple route
app.get("/", (req, res) => {
  res.send("Hello Technigo!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// Log a hashed password to the console
console.log(bcrypt.hashSync("foobar"))
