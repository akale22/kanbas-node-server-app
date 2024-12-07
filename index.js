import express from "express";
import cors from "cors";
import session from "express-session";
import mongoose from "mongoose";
import "dotenv/config";

import Hello from "./Hello.js";
import Lab5 from "./Lab5/index.js";
import PathParameters from "./Lab5/PathParameters.js";
import QueryParameters from "./Lab5/QueryParameters.js";
import WorkingWithObjects from "./Lab5/WorkingWithObjects.js";
import WorkingWithObjects2 from "./Lab5/WorkingWithObjects2.js";
import WorkingWithArrays from "./Lab5/WorkingWithArrays.js";

import UserRoutes from "./Kanbas/Users/routes.js";
import CourseRoutes from "./Kanbas/Courses/routes.js";
import ModulesRoutes from "./Kanbas/Modules/routes.js";
import AssignmentRoutes from "./Kanbas/Assignments/routes.js";
import EnrollmentRoutes from "./Kanbas/Enrollments/routes.js";

// Database Setup
const CONNECTION_STRING =
  process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kanbas";
mongoose.connect(CONNECTION_STRING);

// App Setup
const app = express();
app.use(
  cors({
    credentials: true,
    origin: process.env.NETLIFY_URL || "http://localhost:3000",
  })
);
const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kanbas",
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.NODE_SERVER_DOMAIN,
  };
}
app.use(session(sessionOptions));
app.use(express.json());

// Lab 5 Routes
Hello(app);
Lab5(app);
PathParameters(app);
QueryParameters(app);
WorkingWithObjects(app);
WorkingWithObjects2(app);
WorkingWithArrays(app);

// A5 Routes
UserRoutes(app);
CourseRoutes(app);
ModulesRoutes(app);
AssignmentRoutes(app);
EnrollmentRoutes(app);

// Port Stuff
app.listen(4000, () => console.log("Server running on port 4000"));
