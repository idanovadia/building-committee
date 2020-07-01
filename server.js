const express = require("express");
const bodyParser = require("body-parser");
const mysqlConnection = require("./connection");
// const PeopleRouter = require("./routes/people");
const RegistrationRouter = require("./routes/userRoutes/registration");
const LoginRouter = require("./routes/userRoutes/login");
const UserDetailsRouter = require("./routes/userRoutes/updateDetails");
const paymentsRouter = require("./routes/payments/payments");

var app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Header","*");
    if(req.method === 'OPTIONS'){
        res.header("Access-Control-Allow-Methods","*");
        return res.status(200).json({});
    }
    next();
});

app.use("/registration", RegistrationRouter);
app.use("/login", LoginRouter);
app.use("/myDetails", UserDetailsRouter);
app.use("/payments", paymentsRouter);
app.use("/charges", chargesRouter);



app.listen(4200);