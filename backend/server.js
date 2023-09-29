const express = require("express");
const cors = require('cors');
const app = express();
const db = require("./config/db")
const userRouter = require("./routes/userRoutes");
const adminRouter= require("./routes/adminRoutes")

app.use(cors());
app.use(express.json());

app.use("/", userRouter);
app.use("/admin",adminRouter)

app.listen(5000, () => {
  console.log("server started on port 5000");
});
