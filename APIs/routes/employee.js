const express = require("express");
const db = require("../db");
const utils = require("../utils");
const config = require("../config");
const cryptoJs = require("crypto-js");
const router = express.Router();

//with token wokring fine
router.post("/emp", (request, response) => {
  const {
    emp_no,
    firstname,
    lastname,
    country,
    email,
    gender,
    address,
    city,
    department,
    bloodgroup,
    hiredate,
    birthdate,
    mobileno,
    password,
  } = request.body;
  const encryptedPassword = String(cryptoJs.MD5(password));

  const statement = `
    INSERT INTO employee
        (emp_no,
          firstname,
          lastname,
          country,
          email,
          gender,
          address,
          city,
          department,
          bloodgroup,
          hiredate,
          birthdate,
          mobileno,
          password)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  // const values = [
  //     emp_no,
  //     firstname,
  //     lastname,
  //     country,
  //     email,
  //     gender,
  //     address,
  //     city,
  //     department,
  //     bloodgroup,
  //     hiredate,
  //     birthdate,
  //     mobileno,
  //     encryptedPassword,
  // ]
  db.pool.query(
    statement,
    [
      emp_no,
      firstname,
      lastname,
      country,
      email,
      gender,
      address,
      city,
      department,
      bloodgroup,
      hiredate,
      birthdate,
      mobileno,
      encryptedPassword,
    ],
    (error, result) => {
      response.send(utils.createResult(error, result));
    }
  );
});

router.put("/:empid", (request, response) => {
  const { empid } = request.params;
  const { address, city, department, mobileno } = request.body;

  const statement = `
  update employee set 
          address=?,
          city=?,
          department=?,
          mobileno=?
  where empid=?
  `;

  db.pool.query(
    statement,
    [address, city, department, mobileno, empid],
    (error, result) => {
      response.send(utils.createResult(error, result));
    }
  );
});

router.delete("/:empid", (request, response) => {
  const { empid } = request.params;

  const statement = `
    delete from employee where empid=?
  `;
  db.pool.query(statement, [empid], (error, result) => {
    response.send(utils.createResult(error, result));
  });
});

router.get("/", (request, response) => {
  const stmt = `select * from employee`;

  db.pool.query(stmt, (error, result) => {
    response.send(utils.createResult(error, result));
  });
});

router.get("/:empid", (request, response) => {
  const { empid } = request.params;

  const statement = `
      select * from employee where empid=?
    `;
  db.pool.query(
    statement,
    [empid],

    (error, result) => {
      response.send(utils.createResult(error, result));
    }
  );
});

router.get("/emp/count/", (request, response) => {
  const statement = `select count(rid) as counter from registration`;
  db.pool.query(
    statement,

    (error, result) => {
      response.send(utils.createResult(error, result));
    }
  );
});

module.exports = router;
