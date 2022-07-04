const express = require("express");
const app = express();
const router = require("./routes/routes");;


app.use(express.urlencoded({extended: false}));
app.use(express.json());


app.use("/",router);

app.listen(9090,() => {
    console.log("http://localhost:9090");
});