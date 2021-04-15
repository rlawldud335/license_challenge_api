import dotenv from "dotenv";
import app from "./app";

dotenv.config();

const HOST = process.env.HOST;
const PORT = process.env.PORT || 3000;

const hadleListening = () => {
  console.log(`Listening on : ${HOST}:${PORT}`);
};

app.listen(PORT, hadleListening);
