const express = require("express");
const db = require("../db");
const utils = require("../utils");
const cryptoJs = require("crypto-js");
const config = require("../config");
const jwt = require("jsonwebtoken");

const router = express.Router();
//token is working
// router.post('/signup', (request, response) => {
//   const {firstName, lastName, address, moNo, role,image,email,password } = request.body

//   const encryptedPassword = String(cryptoJs.MD5(password))
//   const statement = `
//     INSERT INTO registration
//         (firstName, lastName, address, moNo, role,image,email,password)
//     VALUES (?, ?, ?, ?, ?, ?, ?,?)
//   `
//   db.pool.query(
//     statement,
//     [firstName, lastName, address, moNo, role,image,email,encryptedPassword],
//     (error, result) => {
//       response.send(utils.createResult(error, result))
//     }
//   )
// })
router.post("/signup", (request, response) => {
  const {
    Name,
    Last_Name,
    Address,
    Contact,
    Role,
    Email,
    Password,
    Emp_No,
    Country,
    City,
    Department,
    Blood_Group,
    Hire_Date,
    Birth_Date,
    ManagerId
  } = request.body;

  const encryptedPassword = String(cryptoJs.MD5(Password));
  const statement = `
    INSERT INTO registration
        (Name,
          Last_Name,
          Address,
          Contact,
          Role,
          Email,
          Password,
          Emp_No,
          Country,
          City,
          Department,
          Blood_Group,
          Hire_Date,
          Birth_Date,
          ManagerId
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  db.pool.query(
    statement,
    [
      Name,
      Last_Name,
      Address,
      Contact,
      Role,
      Email,
      encryptedPassword,
      Emp_No,
      Country,
      City,
      Department,
      Blood_Group,
      Hire_Date,
      Birth_Date,
      ManagerId,
    ],
    (error, result) => {
      response.send(utils.createResult(error, result));
    }
  );
});

router.post("/signin", (request, response) => {
  const { Email, Password } = request.body;

  const encryptedPassword = String(cryptoJs.MD5(Password));
  const statement = `
      SELECT Rid, Name, Last_Name, Email, Password, Role
      FROM registration
      WHERE Email = ? and Password = ?
    `;
  db.pool.query(statement, [Email, encryptedPassword], (error, users) => {
    const result = {};
    if (error) {
      result["status"] = "error";
      result["error"] = error;
    } else if (users.length === 0) {
      result["status"] = "error";
      result["errs.lor"] = "user not found";
    } else {
      // get the first user from the array
      const user = users[0];
      const payload = { id: user["Rid"] };
      const token = jwt.sign(payload, config.secret);

      result["status"] = "success";
      result["data"] = {
        id: `${user["Rid"]}`,
        name: `${user["Name"]} ${user["Last_Name"]}`,
        role: `${user["Role"]}`,
        email: `${user["Email"]}`,
        token,
      };
    }

    response.send(result);
  });
});

module.exports = router;
