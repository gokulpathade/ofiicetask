const express = require("express");
const db = require("../db");
const utils = require("../utils");

const router = express.Router();

router.get("/", (request, response) => {
  const stmt = `select * from registration`;

  db.pool.query(stmt, (error, result) => {
    response.send(utils.createResult(error, result));
  });
});



  // *********************************************************************************************
  //   Manager Api Here
  // *********************************************************************************************


  // Get Manager data  Here using Role Colums Field in Database Api
  router.get("/manager", (request, response) => {
    const role = "manager"; // Provide the role value you want to filter on
    const stmt = `SELECT * FROM registration WHERE Role = ?`;
  
    db.pool.query(stmt, [role], (error, result) => {
      response.send(utils.createResult(error, result));
    });
  });

  // router.get("/LeaveBalance", (request, response) => {
  //   const stmt = `select * from registration`;
  
  //   db.pool.query(stmt, (error, result) => {
  //     response.send(utils.createResult(error, result));
  //   });
  // });



  
  // *********************************************************************************************
  //   Manager Api end Here
  // *********************************************************************************************



// get employee using manager wise
// const db = require('./db'); // Import your database connection
//const utils = require('./utils'); // Import your utility functions


router.get("/usereg/:Rid", (request, response) => {
  const { Rid } = request.params;
   console.log({Rid})

  const stmt = `select Rid from registration where Rid=?`;

  db.pool.query(stmt, [Rid], (error, result) => {
    response.send(utils.createResult(error, result));
  });
});



// *************************************
// GET DATA USING MANAGER ID 
// REPORTING USER TO THE MANAGER
// *************************************

router.get("/manager/:ManagerId", (request, response) => {

  const { ManagerId } = request.params;
console.log({ManagerId})
  const stmt = `SELECT * FROM registration WHERE ManagerId = ?`;

  db.pool.query(stmt, [ManagerId], (error, result) => {
    console.log({error})
    if (error) {
      console.error(error);
      response.status(500).json({ error: "Database error" });
    } else {
      response.json(utils.createResult(null, result));
    }
  });
});





// GET DATA HERE USING REGISTER RID

router.get("/:Rid", (request, response) => {
  const { Rid } = request.params;
  const stmt = `select * from registration where Rid=?`;

  db.pool.query(stmt, [Rid], (error, result) => {
    response.send(utils.createResult(error, result));
  });
});






router.get("/role", (request, response) => {
  const stmt = `select roleid,roles from role`;

  db.pool.query(stmt, (error, result) => {
    response.send(utils.createResult(error, result));
  });
});







// DELETE endpoint to delete a record in the registration table
router.delete("/:Rid", (request, response) => {
  const { Rid } = request.params;

  // Update foreign key references in the applyleave table
  // const updateStatement = `
  //   UPDATE applyleave
  //   SET ApplyId = NULL
  //   WHERE ApplyId = ?;
  // `;

  // Delete the record in the registration table
  const deleteStatement = `
    DELETE FROM registration
    WHERE Rid = ?;
  `;

  // Execute the update and delete statements
  // db.pool.query(updateStatement, [Rid], (updateError, updateResult) => {
  //   if (updateError) {
  //     response.status(500).send(utils.createResult(updateError, null));
  //     return;
  //   }

    // Now, proceed to delete the record in the registration table
    db.pool.query(deleteStatement, [Rid], (deleteError, deleteResult) => {
      response.send(utils.createResult(deleteError, deleteResult));
    });
  });

module.exports = router;
