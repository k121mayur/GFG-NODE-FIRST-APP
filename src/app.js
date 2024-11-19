import express from "express";
import homeRoute from "./routes/homeRouter.js";
import fs from "fs";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
});
app.use((req, res, next) => {
    fs.appendFileSync("./logs/logs", `[${new Date().toUTCString()}] - ${req.method} - ${req.url} - ${res.statusCode}\n`);
    next();
})

app.use("/", homeRoute);

export default app;