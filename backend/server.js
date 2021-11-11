import express from "express";
const app = express();
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Authentication route
import auth from "../backend/routes/auth.js";
import channel from "../backend/routes/channel.js";
import post from "../backend/routes/post.js";
import dashboard from "../backend/routes/dashboard.js";

app.use("/api/v1", auth);
app.use("/api/v1", channel);
app.use("/api/v1", post);
app.use("/api/v1", dashboard);

import connectDatabase from "../backend/config/database.js";

// Connect to database
connectDatabase();

// PORT
const PORT = process.env.PORT || 5001;
const server = app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
