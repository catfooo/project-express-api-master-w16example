import express from "express";
import cors from "cors";
import crypto from 'crypto';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const User = mongoose.model('User', {
  name: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString('hex')
  }
});

const saltRounds = 10;
const password = "foobar";

// Wrap the MongoDB-related operations in an asynchronous function
async function initializeApp() {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/yourdatabase', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Hash the password
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Log the hashed password to the console
    console.log("Hashed Password:", hashedPassword);

    // Create a new user with the hashed password
    const user = new User({ name: "Bob", password: hashedPassword });
    await user.save(); // Wait for the save operation to complete

    // Set up Express app
    const port = process.env.PORT || 8080;
    const app = express();

    app.use(cors());
    app.use(express.json());

    app.get("/", (req, res) => {
      res.send("Hello Technigo!");
    });

    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Error initializing the app:", error);
  }
}

// Call the asynchronous function to initialize the app
initializeApp();

// Log the hashed password with a newly generated random salt
console.log("Hashed Password:", bcrypt.hashSync(password, saltRounds));
