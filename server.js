const express = require("express");
const bodyParser = require("body-parser");
const mysqlConnection = require("./connection");
// const PeopleRouter = require("./routes/people");
const RegistrationRouter = require("./routes/userRoutes/registration");
const userRouter = require("./routes/userRoutes/userDetails");
const AuthenticationRouter = require("./routes/userRoutes/authentication");
const LoginRouter = require("./routes/userRoutes/login");
const UserDetailsRouter = require("./routes/userRoutes/updateDetails");
const paymentsRouter = require("./routes/payments/payments");
const chargesRouter = require("./routes/charges/charges");
const appointmentsRouter = require("./routes/appointments/appointments");
const participantsRouter = require("./routes/meeting_participants/meeting_participants");
// var cors = require('cors')

var app = express();
// app.use(cors({credentials: true, origin: true}))
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
  });

app.use("/registration", RegistrationRouter);
app.use("/authentication", AuthenticationRouter);
app.use("/login", LoginRouter);
app.use("/myDetails", UserDetailsRouter);
app.use("/payments", paymentsRouter);
app.use("/charges", chargesRouter);
app.use("/appointments", appointmentsRouter);
app.use("/participants", participantsRouter);
app.use("/user", userRouter);



app.listen(8080);