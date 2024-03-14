const express = require("express");
const db = require("../db");
const utils = require("../utils");

const router = express.Router();

router.post("/", (request, response) => {
  const { leavetype, leavedesc } = request.body;

  const statement = `
      INSERT INTO leavee
          (leavetype,
            leavedesc
            )
      VALUES (?,?)
    `;

  db.pool.query(statement, [leavetype, leavedesc], (error, result) => {
    response.send(utils.createResult(error, result));
  });
});

router.put("/:leaveid", (request, response) => {
  const { leaveid } = request.params;
  const { deptname, shortdisc } = request.body;
  const statement = `
      UPDATE leavee
      SET
          leavetype = ?, 
          leavedesc = ? WHERE leaveid = ? 
    `;
  db.pool.query(statement, [deptname, shortdisc, leaveid], (error, result) => {
    response.send(utils.createResult(error, result));
  });
});

router.delete("/:leaveid", (request, response) => {
  const { leaveid } = request.params;

  const statement = `
      delete from leavee where leaveid=?
    `;
  db.pool.query(statement, [leaveid], (error, result) => {
    response.send(utils.createResult(error, result));
  });
});








// *********************************************************************************************
//   Manager Api Here
// *********************************************************************************************


//  USE FIRST leave  WORD IN API


// GET ALL LEAVE BALANCE HERE

router.get("/LeaveBalance", (request, response) => {
  const stmt = `select * from leavebalances`;

  db.pool.query(stmt, (error, result) => {
    response.send(utils.createResult(error, result));
  });
});









// Get leave balances by user ID
router.get("/LeaveBalance/:ApplyId", (request, response) => {
  const { ApplyId } = request.params;
  const stmt = `SELECT * FROM leavebalances WHERE ApplyId = ?`;

  db.pool.query(stmt, [ApplyId], (error, result) => {
    response.send(utils.createResult(error, result));
  });
});






// GET DATA USING APPLYID 
// GET DATA FROM TWO TABLE LEAVE BALANCE AND LEAVEE TABLE
// 
router.get("/Balance/:ApplyId", (request, response) => {
  const { ApplyId } = request.params;
  console.log("Received ApplyId:", ApplyId); // Debugging line

  const stmt = `SELECT leavebalances.*, applyleave.*
  FROM leavebalances
  JOIN applyleave ON leavebalances.ApplyId = applyleave.L_Id
  WHERE leavebalances.ApplyId = ?;`;
  console.log("SQL Query:", stmt); // Debugging line

  db.pool.query(stmt, [appid], (error, result) => {
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

router.post('/request', (req, res) => {
  const {

      StartDate,
      EndDate,
      reason,
      appid,
      applyfor,
      leaveDays,
      leavetype,
      ApplyId,

 
 } = req.body;

  // Check LeaveBalances for available leave
  const LeaveBalance = 'SELECT ' + leavetype + ' FROM LeaveBalances WHERE ApplyId = ?';

  db.pool.query(LeaveBalance, [ApplyId], (err, rows) => {
    if (err) {
      console.error('Database error: ' + err.message);
      res.status(500).json({ error: 'Internal server error' });
    }

    else {
      const availableLeave = rows[0][leavetype];
      if (availableLeave <= 0) {
        res.status(400).json({ error: 'Insufficient ' + leavetype + ' balance' });
      }

      else {
        // Deduct leave from LeaveBalances
        const miniusLeaveBalance = 'UPDATE LeaveBalances SET ' + leavetype + ' = ' + leavetype + ' - 1 WHERE ApplyId = ?';
        db.pool.query(miniusLeaveBalance, [ApplyId], (err) => {
          if (err) {
            console.error('Database error: ' + err.message);
            res.status(500).json({ error: 'Internal server error' });
          }
          else {
            // leave request in the Leave table
            const LeaveRequest = 'INSERT INTO applyleave(StartDate,EndDate,reason,appid,applyfor, leaveDays,leavetype, rid ) VALUES (?,?,?,?,?,?,?,?)';

            db.pool.query(LeaveRequest, [StartDate,EndDate,reason,appid,applyfor, leaveDays,leavetype, rid ], (err) => {
              if (err) {
                console.error('Database error: ' + err.message);
                res.status(500).json({ error: 'Internal server error' });
              }
              else {
                res.status(200).json({ message: 'Leave request submitted' });
              }
            });
          }
        });
      }
    }
  });
});






// *********************************************************************************************
//   Manager Api end Here
// "ApplyId": 102,
// "EmpNo": 1022,
//   "EarnedLeave": 6,
//     "CasualLeave": 5,
//       "SpecialSickLeave": 2,
//         "CompOff": 2,
//           "PaternityLeave": 0,
//             "LossOfPay": 1,
//               "OutdoorDuty": 10
// }

// *********************************************************************************************












module.exports = router;





 //router.post('/request', (req, res) => {
  //   const {
  //     ApplyId,
  //     leavetype,
  //     StartDate,
  //     EmpNo,
  //     EarnedLeave,
  //     CasualLeave,
  //     SpecialSickLeave,
  //     CompOff,
  //     PaternityLeave,
  //     LossOfPay,
  //     OutdoorDuty,
  //     leaveid,
  //     leavetype,
  //     leavedesc,
  //     creationDate,
  //     ManagerId
  //   } = req.body;
  
  //   // Check LeaveBalances for available leave
  //   const checkLeaveBalanceQuery = 'SELECT ?? FROM LeaveBalances WHERE ApplyId = ?';
  //   const checkLeaveBalanceParams = [leavetype, ApplyId];
  
  //   db.pool.query(checkLeaveBalanceQuery, checkLeaveBalanceParams, (err, rows) => {
  //     if (err) {
  //       console.error('Database error: ' + err.message);
  //       res.status(500).json({ error: 'Internal server error' });
  //     } else {
  //       const availableLeave = rows[0][0][leavetype];
  //       if (availableLeave <= 0) {
  //         res.status(400).json({ error: 'Insufficient ' + leavetype + ' balance' });
  //       } else {
  //         // Deduct leave from LeaveBalances
  //         const deductLeaveBalanceQuery = 'UPDATE LeaveBalances SET ?? = ?? - 1 WHERE ApplyId = ?';
  //         const deductLeaveBalanceParams = [leavetype, leavetype, ApplyId];
  
  //         db.pool.query(deductLeaveBalanceQuery, deductLeaveBalanceParams, (err) => {
  //           if (err) {
  //             console.error('Database error: ' + err.message);
  //             res.status(500).json({ error: 'Internal server error' });
  //           } else {
  //             // Leave request in the Leave table
  //             const leaveRequestQuery = 'INSERT INTO Leave (ApplyId, leavetype, StartDate, EmpNo, EarnedLeave, CasualLeave, SpecialSickLeave, CompOff, PaternityLeave, LossOfPay, OutdoorDuty, leaveid, leavetype, leavedesc, creationDate, ManagerId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  //             const leaveRequestParams = [ApplyId, leavetype, StartDate, EmpNo, EarnedLeave, CasualLeave, SpecialSickLeave, CompOff, PaternityLeave, LossOfPay, OutdoorDuty, leaveid, leavetype, leavedesc, creationDate, ManagerId];
  
  //             db.pool.query(leaveRequestQuery, leaveRequestParams, (err) => {
  //               if (err) {
  //                 console.error('Database error: ' + err.message);
  //                 res.status(500).json({ error: 'Internal server error' });
  //               } else {
  //                 res.status(200).json({ message: 'Leave request submitted' });
  //               }
  //             });
  //           }
  //         });
  //       }
  //     }
  //   });
  // });
  
  
  
  // router.post('/request', (req, res) => {
  //   const {
  //     ApplyId,
  //     leavetype,
  //     StartDate,
  //     EmpNo,
  //     EarnedLeave,
  //     CasualLeave,
  //     SpecialSickLeave,
  //     CompOff,
  //     PaternityLeave,
  //     LossOfPay,
  //     OutdoorDuty,
  //     leaveid,
  //     leavetype,
  //     leavedesc,
  //     creationDate,
  //     ManagerId
  //   } = req.body;
  
  //   // Check LeaveBalances for available leave
  //   const leaveBalanceQuery = 'SELECT ?? FROM LeaveBalances WHERE ApplyId = ?';
  //   const leaveBalanceParams = [leavetype, ApplyId];
  
  //   db.pool.query(leaveBalanceQuery, leaveBalanceParams, (err, rows) => {
  //     if (err) {
  //       console.error('Database error: ' + err.message);
  //       return res.status(500).json({ error: 'Internal server error' });
  //     }
  
  //     if (rows.length === 0 || rows[0][leavetype] <= 0) {
  //       return res.status(400).json({ error: 'Insufficient ' + leavetype + ' balance' });
  //     }
  
  //     // Deduct leave from LeaveBalances
  //     const updateLeaveBalanceQuery = 'UPDATE LeaveBalances SET ?? = ?? - 1 WHERE ApplyId = ?';
  //     const updateLeaveBalanceParams = [leavetype, leavetype, ApplyId];
  
  //     db.pool.query(updateLeaveBalanceQuery, updateLeaveBalanceParams, (err) => {
  //       if (err) {
  //         console.error('Database error: ' + err.message);
  //         return res.status(500).json({ error: 'Internal server error' });
  //       }
  
  //       // Insert leave request into the Leave table
  //       const leaveRequestQuery = `
  //         INSERT INTO Leave (
  //           ApplyId, leavetype, StartDate, EmpNo, EarnedLeave, CasualLeave,
  //           SpecialSickLeave, CompOff, PaternityLeave, LossOfPay, OutdoorDuty,
  //           leaveid, leavetype, leavedesc, creationDate, ManagerId
  //         ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  //       `;
  
  //       const leaveRequestParams = [
  //         ApplyId, leavetype, StartDate, EmpNo, EarnedLeave, CasualLeave,
  //         SpecialSickLeave, CompOff, PaternityLeave, LossOfPay, OutdoorDuty,
  //         leaveid, leavetype, leavedesc, creationDate, ManagerId
  //       ];
  
  //       db.pool.query(leaveRequestQuery, leaveRequestParams, (err) => {
  //         if (err) {
  //           console.error('Database error: ' + err.message);
  //           return res.status(500).json({ error: 'Internal server error' });
  //         }
  
  //         return res.status(200).json({ message: 'Leave request submitted' });
  //       });
  //     });
  //   });
  // });
  