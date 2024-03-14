const express = require("express");
const db = require("../db");
const utils = require("../utils");
const cron = require("node-cron");

const router = express.Router();
















// *****************************************************************************
//     ADD NEW LEAVE REQUEST HERE
// **********************************************************************
// router.post("/leave/", (request, response) => {
//   const {
//     StartDate,
//     EndDate,
//     Reason,
//     ApplyId,
//     ApplyFor,
//     LDays,
//     LType,
//     Rid,
//   } = request.body;

//   const statement = `
//       INSERT INTO applyleave
//           (StartDate,EndDate,Reason,ApplyId,ApplyFor, LDays,LType, Rid )
//       VALUES (?,?,?,?,?,?,?,?)
//     `;

//   db.pool.query(
//     statement,
//     [StartDate, EndDate, Reason, ApplyId, ApplyFor, LDays, LType, Rid],
//     (error, result) => {
//       response.send(utils.createResult(error, result));
//     }
//   );
// });

// Rid, Name, Last_Name, Address, Contact, Role, Image, Email, Password, CreationDate, Emp_No, Country, City, Department, Blood_Group, Hire_Date, Birth_Date, ManagerId, M_Name

// Lid, StartDate, EndDate, Reason, ApplyId, ApplyFor, LDays, LType, Apply_Status, Status, CreationDate, CreationDatee, Rid

// *****************************************************************************
//      GET ALL LEAVES DETAILS HERE
// **********************************************************************
router.get("/", (request, response) => {
  const statement = `
    select registration.Emp_No,applyleave.Lid,registration.Name,
    registration.Department,applyleave.StartDate,applyleave.EndDate,applyleave.Reason,
    applyleave.LType,applyleave.Applyfor,applyleave.Apply_Status ,
    applyleave.Status from registration inner join applyleave
     on registration.Rid=applyleave.ApplyId;
    `;

  db.pool.query(statement, (error, result) => {
    response.send(utils.createResult(error, result));
  });
});

// **********************************************************************
// Schedule a monthly task to update leave balances
// update leave balances every month
// **********************************************************************
cron.schedule("0 0 1 * *", () => {
  const updateBalance =
    "UPDATE leavebalances SET EarnedLeave = EarnedLeave + 1, CasualLeave = CasualLeave + 1";
  db.pool.query(updateBalance, (err) => {
    if (err) {
      console.error("Error updating leave balances:", err);
    } else {
      console.log("Leave balances updated successfully.");
    }
  });
});

// **********************************************************************
// update leave balances every minute
// **********************************************************************

// cron.schedule('* * * * *', () => {
//   const updateBalance = 'UPDATE leavebalances SET EarnedLeave = EarnedLeave + 1, CasualLeave = CasualLeave + 1';
//   console.log(updateBalance);

//   db.pool.query(updateBalance, (err) => {
//     if (err) {
//       console.error('Error updating leave balances:', err);
//     } else {
//       console.log('Leave balances updated for the minute.');
//     }
//   });
// });

// **********************************************************************
// Schedule a monthly task to update leave balances
// **********************************************************************
cron.schedule("0 0 1 * *", () => {
  const updateEarnedLeave = `
    UPDATE leavebalances
    SET EarnedLeave = EarnedLeave + 1
    WHERE ApplyId = ?`;

  const updateCasualLeave = `
    UPDATE leavebalances
    SET CasualLeave = CasualLeave + 1
    WHERE ApplyId = ?`;
});

// API endpoint for manual leave balance updates
router.put("/UpdateAutoLeaveBalance/:ApplyId", (req, res) => {
  const ApplyId = req.params.ApplyId; // Get ApplyId from URL parameter
  const { EarnedLeave, CasualLeave } = req.body;

  const statement = `
    UPDATE leavebalances
    SET EarnedLeave = ?,
        CasualLeave = ?
    WHERE ApplyId = ?`;

  db.pool.query(
    statement,
    [EarnedLeave, CasualLeave, ApplyId],
    (error, result) => {
      if (error) {
        console.error("Error updating leave balances: " + error.message);
        res.status(500).json({ error: "Error updating leave balances" });
      } else {
        console.log("Leave balances updated successfully");
        res
          .status(200)
          .json({ message: "Leave balances updated successfully" });
      }
    }
  );
});





// **********************************************************************
//     ADD NEW LEAVE REQUEST HERE
// **********************************************************************
router.post("/leave", (req, res) => {
  const {
    StartDate,
    EndDate,
    Reason,
    ApplyId,
    ApplyFor,
    LDays,
    LType,
    Rid,
  } = req.body;

  console.log("Data arriving: ", req.body);

  // Check LeaveBalances for available leave
  const leaveBalanceQuery = "SELECT ?? FROM leavebalances WHERE ApplyId = ?";
  db.pool.query(leaveBalanceQuery, [LType, ApplyId], (err, rows) => {
    if (err) {
      console.error("Database error: " + err.message);
      res.status(500).json({ error: "Internal server error" });
      return;
    }

    const availableLeave = rows[0][LType];

    if (availableLeave < LDays) {
      res.status(400).json({ error: `Insufficient ${LType} balance` });
      return;
    }

    // Deduct leave from LeaveBalances
    const minusLeaveQuery = "UPDATE leavebalances SET ?? = ?? - ? WHERE ApplyId = ?";
    db.pool.query(minusLeaveQuery, [LType, LType, LDays, ApplyId], (err) => {
      if (err) {
        console.error("Database error: " + err.message);
        res.status(500).json({ error: "Internal server error" });
        return;
      }

      // Insert the leave request into the applyleave table
      const leaveRequestQuery = `
        INSERT INTO applyleave (StartDate, EndDate, Reason, ApplyId, ApplyFor, LDays, LType, Rid)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `;

      db.pool.query(
        leaveRequestQuery,
        [StartDate, EndDate, Reason, ApplyId, ApplyFor, LDays, LType, Rid],
        (err) => {
          if (err) {
            console.error("Database error: " + err.message);
            res.status(500).json({ error: "Internal server error" });
            return;
          }

          res.status(200).json({ message: "Leave request submitted" });
        }
      );
    });
  });
});


// **********************************************************************
// ADD BALANCE HERE
// **********************************************************************

router.post("/AddLeaveBalance", (request, response) => {
  const {
    ApplyId,
    EarnedLeave,
    CasualLeave,
    SpecialSickLeave,
    CompOff,
    PaternityLeave,
    LossOfPay,
    OutdoorDuty,
  } = request.body;

  const statement = `
    INSERT INTO leavebalances
    (ApplyId, EarnedLeave, CasualLeave, SpecialSickLeave, CompOff, PaternityLeave, LossOfPay, OutdoorDuty)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.pool.query(
    statement,
    [
      ApplyId,
      EarnedLeave,
      CasualLeave,
      SpecialSickLeave,
      CompOff,
      PaternityLeave,
      LossOfPay,
      OutdoorDuty,
    ],
    (error, result) => {
      if (error) {
        response.status(500).json({ error: "Error inserting leave balances" });
      } else {
        response
          .status(200)
          .json({ message: "Leave balances inserted successfully" });
      }
    }
  );
});

// ***************************************************************
// GET ALL LEAVE BALANCE HERE
// ***************************************************************

router.get("/LeaveBalance", (request, response) => {
  const stmt = `select * from leavebalances`;

  db.pool.query(stmt, (error, result) => {
    if (error) {
      response
        .status(500)
        .json({ error: "error while getting leave balances" });
    } else {
      response
        .status(200)
        .json({ message: "Leave balances find successfully" });
    }
    //  response.send(utils.createResult(error, result));
  });
});






// ***************************************************************
//GET LEAVE BALANCE HERE USING 
// ***************************************************************
router.get("/leave/:ApplyId/:LType", (request, response) => {
  const ApplyId = request.params.ApplyId;  // Fix: use request.params.ApplyId
  const LType = request.params.LType;      // Fix: use request.params.LType

  // Assuming there is a column named 'userId' in the 'leavebalances' table
  const stmt = `SELECT * FROM leavebalances WHERE ApplyId = ? AND LType = ?`;

  db.pool.query(stmt, [ApplyId, LType], (error, result) => {
    if (error) {
      response
        .status(500)
        .json({ error: "Error while getting leave balances" });
    } else {
      response.status(200).json({
        message: "Leave balances fetched successfully",
        data: result,
      });
    }
  });
});



// ***************************************************************
// UPDATE LEAVE BALANCE HERE
// ***************************************************************

router.put("/UpdateLeaveBalance/:ApplyId", (request, response) => {
  const ApplyId = request.params.ApplyId; // Get ApplyId from URL parameter
  const {
    EarnedLeave,
    CasualLeave,
    SpecialSickLeave,
    CompOff,
    PaternityLeave,
    LossOfPay,
    OutdoorDuty,
  } = request.body;

  // Define the SQL statement to update leave balances for a specific ApplyId
  const statement = `
    UPDATE leavebalances
    SET EarnedLeave = ?,
        CasualLeave = ?,
        SpecialSickLeave = ?,
        CompOff = ?,
        PaternityLeave = ?,
        LossOfPay = ?,
        OutdoorDuty = ?
    WHERE ApplyId = ?
  `;

  db.pool.query(
    statement,
    [
      EarnedLeave,
      CasualLeave,
      SpecialSickLeave,
      CompOff,
      PaternityLeave,
      LossOfPay,
      OutdoorDuty,
      ApplyId,
    ],
    (error, result) => {
      if (error) {
        response.status(500).json({ error: "Error updating leave balances" });
      } else {
        response
          .status(200)
          .json({ message: "Leave balances updated successfully" });
      }
    }
  );
});

// ***************************************************************
// CHECK LEAVE REQUEST APPROVE OR REJECTED
// IF REQUEST IS APPRVE OR REJECTED
// THEN MINUS LEAVE BALANCE OR UPDATE LEAVE
// ***************************************************************

router.put("/leave/:Lid/:ApplyStatus", (req, res) => {
  const Lid = req.params.Lid;
  const ApplyStatus = req.params.status; // This can be 'approved' or 'rejected'

  if (ApplyStatus !== "approved" && ApplyStatus !== "rejected") {
    res.status(400).json({ error: "Invalid status" });
    return;
  }

  // Update the leave status in the applyleave table
  const updateStatus = `UPDATE applyleave SET ApplyStatus = ? WHERE Lid = ?`;

  db.pool.query(updateStatus, [ApplyStatus, Lid], (err) => {
    if (err) {
      console.error("Database error: " + err.message);
      res.status(500).json({ error: "Internal server error" });
    } else {
      if (ApplyStatus === "approved") {
        // If leave is approved, no need to update leave balance
        res.status(200).json({ message: "Leave request approved" });
      } else {
        // If leave is rejected, return the deducted leave balance
        const returnBalance = `UPDATE leavebalances SET ${LType} = ${LType} + ? WHERE ApplyId = ?`;

        db.pool.query(returnBalance, [LDays, ApplyId], (err) => {
          if (err) {
            console.error("Database error: " + err.message);
            res.status(500).json({ error: "Internal server error" });
          } else {
            res
              .status(200)
              .json({
                message: "Leave request rejected, leave balance updated",
              });
          }
        });
      }
    }
  });
});




router.put("/leave/:Lid/:ApplyStatus", (req, res) => {
  const Lid = req.params.Lid;
  const ApplyStatus = req.params.ApplyStatus; // This can be 'approved' or 'rejected'

  if (ApplyStatus !== "approved" && ApplyStatus !== "rejected") {
    res.status(400).json({ error: "Invalid status" });
    return;
  }

  // Update the leave status in the applyleave table
  const updateStatus = `UPDATE applyleave SET ApplyStatus = ? WHERE Lid = ?`;

  db.pool.query(updateStatus, [ApplyStatus, Lid], (err) => {
    if (err) {
      console.error("Database error: " + err.message);
      res.status(500).json({ error: "Internal server error" });
    } else {
      if (ApplyStatus === "approved") {
        // If leave is approved, no need to update leave balance
        res.status(200).json({ message: "Leave request approved" });
      } else {
        // If leave is rejected, return the deducted leave balance
        const getLeaveDetails = `SELECT LType, LDays, ApplyId FROM applyleave WHERE Lid = ?`;

        db.pool.query(getLeaveDetails, [Lid], (err, results) => {
          if (err) {
            console.error("Database error: " + err.message);
            res.status(500).json({ error: "Internal server error" });
          } else if (results.length === 1) {
            const { LType, LDays, ApplyId } = results[0];

            const returnBalance = `UPDATE leavebalances SET ${LType} = ${LType} + ? WHERE ApplyId = ?`;

            db.pool.query(returnBalance, [LDays, ApplyId], (err) => {
              if (err) {
                console.error("Database error: " + err.message);
                res.status(500).json({ error: "Internal server error" });
              } else {
                res
                  .status(200)
                  .json({
                    message: "Leave request rejected, leave balance updated",
                  });
              }
            });
          } else {
            res.status(404).json({ error: "Leave request not found" });
          }
        });
      }
    }
  });
});



// *********************************************************************************************
//   MANAGER  Api's START FROM Here
// *********************************************************************************************


// Get Team leave Application 
router.get("/LeaveRequest/:ManagerId", (request, response) => {
  const ManagerId = request.params.ManagerId; // Use request.params.ManagerId to get the parameter
  const statement = `
    SELECT registration.Emp_No, applyleave.Lid, registration.Name,
    registration.Department, applyleave.StartDate, applyleave.EndDate, applyleave.Reason,
    applyleave.LType, applyleave.Applyfor, applyleave.LDays, applyleave.ApplyStatus,
    applyleave.Status, applyleave.CreationDate, applyleave.CreationDatee, applyleave.Rid
    FROM registration
    INNER JOIN applyleave ON registration.Rid = applyleave.ApplyId
    WHERE registration.ManagerId = ?;
  `;

  db.pool.query(statement, [ManagerId], (error, result) => {
    response.send(utils.createResult(error, result));
  });
});


// router.put('/StatusUpdateLeaveBalance/:ApplyId', (req, res) => {
//   const ApplyId = req.params.ApplyId; // Get ApplyId from URL parameter
//   const { EarnedLeave, CasualLeave, Status } = req.body;

//   // Check the leave status
//   if (Status === 'rejected') {
//     // Leave application is rejected, calculate and return leave balance
//     const statement = `
//       SELECT EarnedLeave, CasualLeave
//       FROM leavebalances
//       WHERE ApplyId = ?`;

//     db.pool.query(
//       statement,
//       [ApplyId],
//       (error, result) => {
//         if (error) {
//           console.error('Error checking leave status: ' + error.message);
//           res.status(500).json({ error: 'Error checking leave status' });
//         }
//        else {
//                if (result.length === 0) {
//                 res.status(404).json({ error: 'Leave record not found' });
//                   }
//           else {
//              const leaveBalance = result[0];
//                console.log('Leave application rejected');
//                 res.status(200).json({message: 'Leave application rejected. Leave balance:',
//               LeaveBalance: leaveBalance
//             });
//           }
//         }
//       });
//   }

//   else {
//     // Leave application is approved, update leave balances
//     const updateStatement = `
//       UPDATE leavebalances
//       SET EarnedLeave = ?,
//           CasualLeave = ?
//       WHERE ApplyId = ?`;

//     db.pool.query(
//       updateStatement,
//       [EarnedLeave, CasualLeave, ApplyId],
//       (error, result) => {
//         if (error) {
//           console.error('Error updating leave balances: ' + error.message);
//           res.status(500).json({ error: 'Error updating leave balances' });
//         } else {
//           console.log('Leave balances updated successfully');
//           res.status(200).json({ message: 'Leave balances updated successfully' });
//         }
//       });
//   }
// });

// GET DATA USING APPLYID
// GET DATA FROM TWO TABLE LEAVE BALANCE AND LEAVEE TABLE
//
router.get("/Balance/:ApplyId", (request, response) => {
  const { ApplyId } = request.params;
  console.log("Received ApplyId:", ApplyId); // Debugging line

  const stmt = `SELECT leavebalances.*, applyleave.*
  FROM leavebalances
  JOIN applyleave ON leavebalances.ApplyId = applyleave.ApplyId
  WHERE leavebalances.ApplyId = ?;`;
  console.log("SQL Query:", stmt); // Debugging line

  db.pool.query(stmt, [ApplyId], (error, result) => {
    if (error) {
      console.error("Database Error:", error); // Debugging line
    }
    response.send(utils.createResult(error, result));
  });
});

// get leave table and leave balance table in together*****************************************
// SELECT leavebalances.*, leavee.*
// FROM leavebalances
// JOIN leavee ON leavebalances.ApplyId = leavee.ApplyId
// WHERE leavebalances.ApplyId = 102;

// APPLY LEAVE HERE USING POST REQUEST

// router.post('/request', (req, res) => {
//   const {

//     StartDate,
//     EndDate,
//     reason,
//     ApplyId,
//     applyfor,
//     LDays,
//     LType,
//     ApplyId,

//   } = req.body;

//   // Check LeaveBalances for available leave
//   const LeaveBalance = 'SELECT ' + LType + ' FROM LeaveBalances WHERE ApplyId = ?';

//   db.pool.query(LeaveBalance, [ApplyId], (err, rows) => {
//     if (err) {
//       console.error('Database error: ' + err.message);
//       res.status(500).json({ error: 'Internal server error' });
//     }

//     else {
//       const availableLeave = rows[0][LType];
//       if (availableLeave <= 0) {
//         res.status(400).json({ error: 'Insufficient ' + LType + ' balance' });
//       }

//       else {
//         // Deduct leave from LeaveBalances
//         const miniusLeaveBalance = 'UPDATE LeaveBalances SET ' + LType + ' = ' + LType + ' - 1 WHERE ApplyId = ?';
//         db.pool.query(miniusLeaveBalance, [ApplyId], (err) => {
//           if (err) {
//             console.error('Database error: ' + err.message);
//             res.status(500).json({ error: 'Internal server error' });
//           }
//           else {
//             // leave request in the Leave table
//             const LeaveRequest = 'INSERT INTO applyleave(StartDate,EndDate,reason,ApplyId,applyfor, LDays,LType, Rid ) VALUES (?,?,?,?,?,?,?,?)';

//             db.pool.query(LeaveRequest, [StartDate, EndDate, reason, ApplyId, applyfor, LDays, LType, Rid], (err) => {
//               if (err) {
//                 console.error('Database error: ' + err.message);
//                 res.status(500).json({ error: 'Internal server error' });
//               }
//               else {
//                 res.status(200).json({ message: 'Leave request submitted' });
//               }
//             });
//           }
//         });
//       }
//     }
//   });
// });

// *********************************************************************************************
//   Manager Api end Here
// "ApplyId": 102,
// "Emp_No": 1022,
//   "EarnedLeave": 6,
//     "CasualLeave": 5,
//       "SpecialSickLeave": 2,
//         "CompOff": 2,
//           "PaternityLeave": 0,
//             "LossOfPay": 1,
//               "OutdoorDuty": 10
// }

// *********************************************************************************************

// GET USER DETAILS HERE USING Rid 
// user Applyed leave Request Come Here 
router.get("/:Rid", (request, response) => {
  const Rid = request.params.Rid; // Get the ApplyId from the request parameter
  const statement = `
  SELECT
  registration.Emp_No,
  registration.Name,
  registration.Department,
  applyleave.Lid,
  applyleave.StartDate,
  applyleave.EndDate,
  applyleave.Reason,
  applyleave.LType,
  applyleave.ApplyFor,
  applyleave.ApplyStatus
FROM
  registration
INNER JOIN
  applyleave
ON
  registration.Rid = applyleave.ManagerId
WHERE
  registration.Rid = ? ;


  `;

  db.pool.query(statement, [Rid], (error, result) => {
    response.send(utils.createResult(error, result));
  });
});

// router.get("/:Rid", (request, response) => {
//   const statement = `
//   SELECT * FROM hrms.applyleave Where ApplyId=?;
//       `;

//   db.pool.query(statement, (error, result) => {
//     response.send(utils.createResult(error, result));
//   });
// });

// *********************************************************************
// get LEAVES DETAILS USING Rid HERE
// *********************************************************************
router.get("/manage/:ManagerId", (request, response) => {
  const ManagerId = request.params.Rid;
  const stmt = "SELECT * FROM applyleave WHERE ManagerId = ?";

  db.pool.query(stmt, [Rid], (error, result) => {
    if (error) {
      console.error("Error in database query:", error);
      response.status(500).json({ error: "Internal server error" });
    } else {
      response.json(result);
    }
  });
});




// get Pending Request Here 

router.get("/Pending/:ApplyId", (request, response) => {
  const ApplyId = request.params.ApplyId;
  const stmt = "SELECT * FROM applyleave WHERE ApplyId = ? AND ApplyStatus = 'pending'";

  db.pool.query(stmt, [ApplyId], (error, result) => {
    if (error) {
      console.error("Error in database query:", error);
      response.status(500).json({ error: "Internal server error" });
    } else {
      console.log("Result from database query:", result);
      response.json(result);
    }
  });
});



// get team leave application here
router.get("/Pending/:", (request, response) => {
  const ApplyId = request.params.ApplyId;
  const stmt = "SELECT * FROM applyleave WHERE ApplyId = ? AND ApplyStatus = 'pending'";

  db.pool.query(stmt, [ApplyId], (error, result) => {
    if (error) {
      console.error("Error in database query:", error);
      response.status(500).json({ error: "Internal server error" });
    } else {
      console.log("Result from database query:", result);
      response.json(result);
    }
  });
});



// Get Approve Request here For  Histroy Tab

router.get("/ApplyStatus/:ApplyId", (request, response) => {
  const ApplyId = request.params.ApplyId;
  console.log("Received user ID:", ApplyId);

  const stmt = "SELECT * FROM applyleave WHERE ApplyId = ? AND ApplyStatus IN ('approved', 'rejected')";
  
  db.pool.query(stmt, [ApplyId], (error, result) => {
    if (error) {
      console.error("Error in database query:", error);
      response.status(500).json({ error: "Internal server error" });
    } else {
      // console.log("Result from database query:", result);
      response.json(result);
    }
  });
});






// Accept Leave Application here 
router.post("/:ApplyId/:ApplyStatus", (request, response) => {
  const { ApplyId, status } = request.params;

  // Validate the status value (should be either "accepted" or "rejected")
  if (status !== "accepted" && status !== "rejected") {
    return response.status(400).json({ error: "Invalid status value" });
  }

  // Update the ApplyStatus based on the provided status value
  const updateStatement = `
    UPDATE applyleave
    SET ApplyStatus = ?
    WHERE ApplyId = ?;
  `;

  // Execute the update statement
  db.pool.query(updateStatement, [status, ApplyId], (error, result) => {
    if (error) {
      response.status(500).send(utils.createResult(error, null));
      return;
    }

    response.send(utils.createResult(null, result));
  });
});



router.get("/manage/rejected/", (request, response) => {
  const ApplyStatus = request.params.ApplyStatus;
  const stmt = "SELECT * FROM hrms.applyleave WHERE ApplyStatus = 'rejected'";

  db.pool.query(stmt,[ApplyStatus], (error, result) => {
    if (error) {
      console.error("Error in database query:", error);
      response.status(500).json({ error: "Internal server error" });
    } else {
      response.json(result);
    }
  });
});

// *********************************************************************************************
//   Manager Api END HERE
// *********************************************************************************************

//get specific record
router.get("/getleaveapp/:ApplyId", (request, response) => {
  const { ApplyId } = request.params;

  const statement = `
    select registration.Emp_No,registration.Name,applyleave.StartDate,
    applyleave.EndDate,applyleave.LType,applyleave.LDays,applyleave.ApplyStatus,
    applyleave.Lid from registration inner join applyleave
     on registration.Rid=applyleave.ApplyId where registration.Rid=?;
    `;

  db.pool.query(statement, [ApplyId], (error, result) => {
    response.send(utils.createResult(error, result));
  });
});

//working

// *****************************************************************************
//
// **********************************************************************
router.delete("/deleteleave/:Lid", (request, response) => {
  const { Lid } = request.params;

  const statement = `
    delete applyleave from applyleave inner join registration 
    on registration.Rid=applyleave.ApplyId where applyleave.Lid=?;
    `;

  db.pool.query(statement, [Lid], (error, result) => {
    response.send(utils.createResult(error, result));
  });
});

// *****************************************************
//               GET LEAVES DETAILS
//            USING LEAVE ID HERE
// *****************************************************

router.get("/leave/:Lid", (request, response) => {
  const { Lid } = request.params;

  const statement = `
    select StartDate,EndDate,LType,
    ApplyStatus from applyleave where Lid=?;
    `;

  db.pool.query(statement, [Lid], (error, result) => {
    response.send(utils.createResult(error, result));
  });
});

// *****************************************************
//               GET LEAVES DETAILS
//            USING LEAVE ID HERE
// *****************************************************

router.get("/et/:Lid", (request, response) => {
  const { Lid } = request.params;

  const statement = `
    select * from applyleave where Lid=?
    `;

  db.pool.query(statement, [Lid], (error, result) => {
    response.send(utils.createResult(error, result));
  });
});

// *****************************************************
// select count(Lid) as TodaysLeave from applyleave where StartDate=current_date();
// *****************************************************

router.get("/applyleave/count/", (request, response) => {
  const statement = `select count(Lid) as counter from applyleave
     where StartDate=current_date()`;
  db.pool.query(
    statement,

    (error, result) => {
      response.send(utils.createResult(error, result));
    }
  );
});

// *****************************************************
//count status 0 from applyleave table (for notification )
// *****************************************************

router.get("/applyleavestatus/count/", (request, response) => {
  const statement = `select count(Status) as counter from applyleave where Status=0`;
  db.pool.query(
    statement,

    (error, result) => {
      response.send(utils.createResult(error, result));
    }
  );
});

// **********************************************************************
//  Get Count Of User of Reporting Manager
// **********************************************************************

router.get("/status/count/", (request, response) => {
  const statement = `
    SELECT COUNT(stauss) AS counter
    FROM applyleave
    WHERE stauss = 0
    AND manager_id=?; 
  `;
  db.pool.query(statement, (error, result) => {
    response.send(utils.createResult(error, result));
  });
});

// *****************************************************************************
//update status=1 (for notification )
// **********************************************************************

router.put("/applyleave/status/", (request, response) => {
  const { stauss } = request.body;

  const statement = `update applyleave set stauss=1 where stauss=0`;
  db.pool.query(
    statement,
    [stauss],

    (error, result) => {
      response.send(utils.createResult(error, result));
    }
  );
});

// *****************************************************************************
//update status=1 (for notification )
// **********************************************************************

router.put("/edit/:Lid", (request, response) => {
  const { Lid } = request.params;
  const { ApplyStatus } = request.body;

  const statement = `
    update applyleave set 
            ApplyStatus=?
           where Lid=?
    `;

  db.pool.query(statement, [ApplyStatus, Lid], (error, result) => {
    response.send(utils.createResult(error, result));
  });
});

module.exports = router;

// module.exports = router;

//select registration.Emp_No,registration.Name,applyleave.LType,applyleave.LDays,applyleave.ApplyStatus from registration inner join applyleave on registration.Rid=applyleave.ApplyId where registration.Rid=27;
// router.get('/:Lid', (request, response) => {
//   const{Lid}=request.params

//   const statement = `
//   select * from applyleave where Lid=?
//   `

//   db.pool.query(statement,[Lid], (error, result) => {
//       response.send(utils.createResult(error, result))
//     })
// })

// router.put('/:regid/:TodayDate', (request, response) => {
//   const{regid,TodayDate}=request.params
//   const {TimeOut} = request.body
//    const statement = `
//    update registration inner join registration1 on registration.Rid=registration1.regid set TimeOut=current_time() where registration1.regid=? and registration1.TodayDate=? limit 1;
//    `
//     db.pool.query(statement,[regid,TodayDate,TimeOut] ,(error, result) => {
//        response.send(utils.createResult(error, result))
//      })
//  })

// router.put('/edit/:ApplyId', (request, response) => {
//   const {ApplyId} = request.params
//   const {ApplyStatus
//   } = request.body

//   const statement = `
//   update applyleave set
//           ApplyStatus=?
//          where ApplyId=?
//   `

//   db.pool.query(statement, [
//     ApplyStatus,ApplyId
//     ], (error, result) => {
//       response.send(utils.createResult(error, result))
//     })
// })
