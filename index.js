const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { sequelize } = require("./models");
const job = require("./services/jobs");
require("dotenv").config();

const app = express();

// Prepare middleware to pass sequelize object to routers
function sequelizeMiddleware(req, res, next) {
	req.sequelize = sequelize;
	next();
}

// Express Configuration
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Middlewares
app.use(sequelizeMiddleware);

// Routes
app.use("/", require("./controllers/public.controller"));
app.use("/auth", require("./controllers/auth.controller"));
app.use("/course", require("./controllers/course.controller"))

// Start Server
app.listen(3000, async () => {
	job.start()
	console.log("Database Running!");
	console.log("Backend running on port 3000");
});
