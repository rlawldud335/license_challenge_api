import dotenv from "dotenv";
import mysql from "mysql2/promise";
import mongoose from "mongoose";

dotenv.config();

//mysql connection
const mysqlConfig = JSON.parse(process.env.MYSQLCONN);
const mysqlconn = mysql.createPool(mysqlConfig);
if (mysqlconn) {
  console.log("mysql connected sucessfully!");
} else {
  console.log("mysql connection error");
}

//mongodb connection
mongoose.connect(process.env.MONGODBCONN, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
const mgconn = mongoose.connection;
mgconn.once("open", () => console.log("mongodb connected sucessfully!"));
mgconn.on("error", (error) =>
  console.log(`mongodb connection error : ${error}`)
);

export { mysqlconn, mgconn };
