import express from "express";
import cors from "cors";
import UserRoute from "./routes/UserRoute.js";
import LabelRoute from "./routes/LabelRoute.js";
import ListRoute from "./routes/ListRoute.js";
import CardRoute from "./routes/CardRoute.js";
import MemberRoute from "./routes/MemberRoute.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(UserRoute);
app.use(LabelRoute);
app.use(ListRoute);
app.use(CardRoute);
app.use(MemberRoute);

app.listen(5000, ()=> console.log('Server running in progress...'));