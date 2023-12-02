import express from "express";
import cors from "cors";
import crypto from 'crypto';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/your-database-name', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define the User model
const User = mongoose.model('User', {
  name: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString('hex'),
  },
});

// Create an Express app
const app = express();

// Define middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Define a simple route
app.get("/", (req, res) => {
  res.send("Hello Technigo!");
});

// Define the port the app will run on
const port = process.env.PORT || 8080;

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// Create a user with hashed password and save to MongoDB
const saltRounds = 10; // You can adjust the number of salt rounds based on your requirements
const hashedPassword = bcrypt.hashSync("foobar", saltRounds);
const user = new User({ name: "Bob", password: hashedPassword });
user.save();

// Log the hashed password to the console
console.log(bcrypt.hashSync("foobar"));
