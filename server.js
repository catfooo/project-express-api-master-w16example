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

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/yourdatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    // Hash the password
    const hashedPassword = bcrypt.hashSync("foobar", 10);

    // Create a new user with the hashed password
    const user = new User({ name: "Bob", password: hashedPassword });

    // Save the user to the database
    return user.save();
  })
  .then(() => {
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

    // This will be executed after the server starts listening
    console.log(bcrypt.hashSync("foobar"));
  })
  .catch((error) => {
    console.error("Error during initialization:", error);
  });
