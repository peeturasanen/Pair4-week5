const User = require('../models/usermodel');
const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const SECRET="secretword"
const createToken = (_id) => {
  return jwt.sign({ _id }, SECRET, {expiresIn: "3d"});
};

// Endpoint for user registration
const createUser = async (req, res) => {
    const { username, password } = req.body;
  
    const hashedPassword = await bcrypt.hash(password, saltRounds,);
    // Create a new user document and save it to the database
    const newUser = new User({ username, hashedPassword });
    await newUser.save();

    // Create JWT token
    const token = createToken(newUser._id);
  
    res.status(201).json({ message: "User registered successfully", token });
  };
  
  // Endpoint to authenticate a user
  const userLogin = async (req, res) => {
    const { username, password } = req.body;
    // Find the user by username
    const user = await User.findOne({ username });
  
    if (!user) {
      return res.status(401).json({ message: "Authentication failed" });
    }
  
    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.hashedPassword);
  
    if (!passwordMatch) {
      return res.status(401).json({ message: "Authentication failed" });
    }
    
    // Create JWT token
    const token = createToken(user._id);

    res.status(200).json({ message: "Authentication successful", token });
  };
  
  // Endpoint to fetch all users
  const getUsers = async (req, res) => {
    const allUsers = await User.find({});
    res.status(200).json(allUsers);
  };
  
  // Endpoint to delete a user by ID
  const deleteUser = async (req, res) => {
    const { id } = req.params;
  
    const deletedUser = await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully" });
  };

// Define the protected route
const protectedRoute = async (req, res) => {
  // If the execution reaches here, it means the user is authenticated
  // You can access the authenticated user's information from req.user
  res.status(200).json({ message: "Protected route accessed successfully", user: req.user });
};    

    module.exports = {
        createUser,
        userLogin,
        getUsers,
        deleteUser,
        protectedRoute
    }