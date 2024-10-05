require("dotenv").config();

const express = require("express");
const app = express();

app.use(express.json());

const PORT = 7777;
const imageRoutes = require("./routes/imageRoute");
app.use("/api", imageRoutes);

app.listen(PORT, ()=>{
    console.log(`app is runing on ${PORT}`);
});
