import "@babel/polyfill";
import dotenv from "dotenv";
import app from "./app";

dotenv.config();

const PORT = process.env.PORT || 3000;

const hadleListening = () =>
  console.log(
    process.env.PRODUCTION
      ? ` ${process.env.PRODUCTION} Listening on: https://license-challenge.herokuapp.com:${PORT}`
      : ` ${process.env.PRODUCTION} Listening on: http://localhost:${PORT}`
  );

app.listen(PORT, hadleListening);
