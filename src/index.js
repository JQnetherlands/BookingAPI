import "./instrument.mjs";
import * as Sentry from "@sentry/node";
import 'dotenv/config';
import express from "express";
import usersRouter from "./routes/users.js";
import bookingsRouter from "./routes/bookings.js";
import propertiesRouter from "./routes/properties.js";
import reviewsRouter from "./routes/reviews.js";
import hostsRouter from "./routes/hosts.js";
import loginRouter from "./routes/login.js";
import logMiddleware from './middleware/logMiddleware.js';
import errorHandler from "./middleware/errorHandler.js";

const app = express();

app.use(express.json());
app.use(logMiddleware);
app.use('/users', usersRouter);
app.use('/bookings', bookingsRouter);
app.use('/properties', propertiesRouter);
app.use('/reviews', reviewsRouter);
app.use('/hosts', hostsRouter);
app.use('/login', loginRouter);

app.get("/", (req, res) => {
  res.send("Hello world!");
});
app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});

Sentry.setupExpressErrorHandler(app);

app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
