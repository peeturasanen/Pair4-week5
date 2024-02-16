const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use('/api/protectedroute', require('./routes/protectedRoute.js'))
app.use('/', require('./routes/router.js'))
// Connect to MongoDB database
mongoose
  .connect(
    "mongodb+srv://peetu:cluster1@cluster1.vhh9ydh.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
