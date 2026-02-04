//library
import express from "express";
import dotEnv from "dotenv";
import session from "express-session";
import mongoStore from "connect-mongo";
dotEnv.config();

//file import
import connectDB from "./configs/db.js";
import userRoute from "./routes/userRoute.js";
const PORT = process.env.PORT;
const app = express();

//middleware
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60, //1hr
    },
    rolling: true,
    store: mongoStore.create({
      mongoUrl: process.env.MONGO_URI,
    }),
  }),
);

//routes
app.use("/api/auth", userRoute);

//database connection
connectDB();
app.listen(PORT, () => {
  console.log(`App is running at http://localhost:${PORT}`);
});
