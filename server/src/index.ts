import express, { Request, Response } from "express";
import connectDB from "./database";

const app = express();

connectDB();

const PORT = process.env.PORT || 5000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
