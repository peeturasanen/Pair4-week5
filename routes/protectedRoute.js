const express = require("express");
const requireAuth = require('../middlewares/requireAuth');

const {
    protectedRoute
    } = require("../controllers/usercontroller");

const protectedRouter = express.Router();

// protected route
protectedRouter.get("/", requireAuth, protectedRoute)

module.exports = protectedRouter;