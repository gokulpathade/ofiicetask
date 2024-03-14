const express = require("express");
const config = require("./config");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const utils = require("./utils");
const bodyParser = require('body-parser')
const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("uploads"));

// add middleware to extract token

app.use((request, response, next) => {
  if (request.url === "/user/signup" || request.url === "/user/signin") {
    next();
  } else {
    const token = request.headers["token"];
    if (!token || token.length === 0) {
      response.send(utils.createResult()); // response.send(utils.createResult('token is missing '))
      // response.send(utils.createResult('token is missing '))
    } else {
      try {
        // extract the user id from token
        const payload = jwt.verify(token, config.secret);

        // add the userid to the request so that
        // all the other requests can use it
        request.userId = payload.id;

        next();
      } catch (ex) {
        response.send(utils.createResult("invalid token"));
      }
    }
  }
});

// add the routes
const departmentRouter = require("./routes/department");
const userRouter = require("./routes/user");
const employeeRouter = require("./routes/employee");
const leaveRouter = require("./routes/leave");
const uploadRouter = require("./routes/uploadimage");
const userDetailsRouter = require("./routes/userDetails");
const TimeRouter = require("./routes/Time");
const ReportingRouter = require("./routes/reporting");
const ApplyleaveRouter = require("./routes/applyleave");

app.use("/user", userRouter);
app.use("/employee", employeeRouter);
app.use("/department", departmentRouter);
app.use("/leave", leaveRouter);
app.use("/use", userDetailsRouter);
app.use("/uploadimg", uploadRouter);
app.use("/timereg", TimeRouter);
app.use("/reporting", ReportingRouter);
app.use("/applyLeave", ApplyleaveRouter);

app.listen(4000, "0.0.0.0", () => {
  console.log("server started on port 4000");
});
