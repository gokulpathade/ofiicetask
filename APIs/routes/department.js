const express = require("express");
const db = require("../db");
const utils = require("../utils");
const config = require("../config");

const router = express.Router();

router.post("/dept", (request, response) => {
  const { deptname, shortdisc } = request.body;

  const statement = `
      INSERT INTO department
          ( deptname,
            shortdisc
            )
      VALUES (?,?)
    `;

  db.pool.query(statement, [deptname, shortdisc], (error, result) => {
    response.send(utils.createResult(error, result));
  });
});

router.put("/:deptid", (request, response) => {
  const { deptid } = request.params;
  const { deptname, shortdisc } = request.body;
  const statement = `
      UPDATE department 
      SET
          deptname = ?, 
          shortdisc = ? WHERE deptid = ? 
    `;
  db.pool.query(statement, [deptname, shortdisc, deptid], (error, result) => {
    response.send(utils.createResult(error, result));
  });
});

router.delete("/:deptid", (request, response) => {
  const { deptid } = request.params;

  const statement = `
      delete from department where deptid=?
    `;
  db.pool.query(statement, [deptid], (error, result) => {
    response.send(utils.createResult(error, result));
  });
});

router.get("/", (request, response) => {
  const statement = `
      select * from department
    `;
  db.pool.query(
    statement,

    (error, result) => {
      response.send(utils.createResult(error, result));
    }
  );
});

router.get("/:deptid", (request, response) => {
  const { deptid } = request.params;

  const statement = `
      select * from department where deptid=?
    `;
  db.pool.query(
    statement,
    [deptid],

    (error, result) => {
      response.send(utils.createResult(error, result));
    }
  );
});

router.get("/dept/count/", (request, response) => {
  const statement = `select count(deptid) as counter from department`;
  db.pool.query(
    statement,

    (error, result) => {
      response.send(utils.createResult(error, result));
    }
  );
});
module.exports = router;
