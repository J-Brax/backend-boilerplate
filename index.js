//library
import express from "express";
import dotEnv from "dotenv";
import session from "express-session";
import mongoStore from "connect-mongo";
import cors from "cors";
import helmet from "helmet";

dotEnv.config();

//file import
import connectDB from "./configs/db.js";
import userRoute from "./routes/userRoute.js";
import limiterConfig from "./configs/limiter.js";
import postRoute from "./routes/postRoute.js";
const port = process.env.PORT;
const app = express();

//middleware
app.use(limiterConfig);
app.use(helmet());
app.use(cors());
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
app.use("/api/post", postRoute);
app.get('/get-data', async (req, res) => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const result = await response.json();
  res.json(result);
});

//database connection
connectDB();
app.listen(port, () => {
  console.log(`App is running at http://localhost:${port}`);
});
