import express from "express";
import cors from "cors";
import crypto from 'crypto'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

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

// One-way encryption
const user = new User({name: "Bob", password: bcrypt.hashSync("foobar")})
user.save()

const port = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello Technigo!");
});

// Endpoint to log hashed password
app.get("/hashed-password", (req, res) => {
  const hashedPassword = bcrypt.hashSync("foobar");
  console.log("Hashed Password:", hashedPassword);
  res.send("Check the console for the hashed password");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
