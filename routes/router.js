const express = require("express");

const {
    createUser,
    userLogin,
    getUsers,
    deleteUser,
    } = require("../controllers/usercontroller");

const router = express.Router();

// creater user
router.post("/api/users", createUser);

// user login
router.post("/api/users/login", userLogin)

// get all users
router.get("/api/users", getUsers)

// delete user
router.delete("/api/users/:id", deleteUser)

module.exports = router;