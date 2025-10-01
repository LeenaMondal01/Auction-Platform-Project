import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { connection } from "./database/connection.js";
import { errorMiddleware } from "./middlewares/error.js";
import userRouter from "./router/userRoutes.js";
import auctionItemRouter from "./router/auctionItemRoutes.js";
import bidRouter from "./router/bidRoutes.js"
import commissionRouter from "./router/commissionRouter.js"
import superAdminRouter from "./router/superAdminRoutes.js"
import { endedAuctionCron } from "./automation/endedAuctionCron.js";
import {verifyCommissionCron} from "./automation/verifyCommissionCron.js"
import dotenv from "dotenv";
dotenv.config();


const app = express();

// const allowedOrigins = process.env.FRONTEND_URL
//   ? process.env.FRONTEND_URL.split(",")
//   : [];
app.use(cors({
  origin: [process.env.FRONTEND_URL,"http://localhost:5173"],
  methods: ["POST","GET","PUT","DELETE"],
  credentials:  true,
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: "/tmp/",
}))

app.use("/api/v1/user", userRouter);
app.use("/api/v1/auctionitem", auctionItemRouter);
app.use("/api/v1/bid",bidRouter);
app.use("/api/v1/commission",commissionRouter);
app.use("/api/v1/superadmin",superAdminRouter);
app.get("/",(req,res) => {
  res.send("hello world"); 
});

endedAuctionCron();
verifyCommissionCron();

connection();
app.use(errorMiddleware);
 

// Add the server start code here
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

export default app;