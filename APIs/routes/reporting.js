const express = require("express");
const db = require("../db");
const utils = require("../utils");
const dayjs =require("dayjs")
const router = express.Router();
const date = require('date-and-time') 


const moment = require('moment'); 









// Store new request of reporting
//  SAVE NEW DATA HERE USING POST METHOD
router.post("/add", (req, res) => {
  const { Rid, TimeIn, TimeOut, Date, Reason, Reporting } = req.body; // Fix typo here

  console.log(req.body);
  
  const statement = `
    INSERT INTO reporting
    (Rid, TimeIn, TimeOut, Date, Reason, Reporting, CreationDate)
    VALUES (?, ?, ?, ?, ?, ?,  CURRENT_TIMESTAMP)
  `;

  db.pool.query(statement, [Rid, TimeIn, TimeOut, Date, Reason, Reporting], (error, results) => {
    if (error) {
      console.error("Error inserting data:", error);
      return res.status(500).json({ error: "Internal Server Error", details: error });
    } else {
      console.log("Data inserted successfully");
      return res.status(201).json({ message: "Data inserted successfully" });
    }
  }, { timestamps: true });
});



// **********************************************************************
// Reporting Manager data
// **********************************************************************


// **********************************************************************
// update throug the R_id data to calculate 
// **********************************************************************
router.put('/timeIn/:R_Id', (req, res) => {
  const R_Id = req.params.R_Id;
  const { TimeIn, TimeOut } = req.body;
  console.log('Values received:', req.body);
  console.log('Received TimeIn:', TimeIn);
  console.log('Received TimeOut:', TimeOut);

  // const currentDate = moment().format('YYYY-MM-DD');

  // Assuming TimeIn and TimeOut are in HH:mm format
  // const timeIn = moment(` ${TimeIn}`, ' HH:mm:ss');
  // const timeOut = moment(` ${TimeOut}`, 'HH:mm:ss');
  // console.log('Values to be inserted:', timeIn, timeOut);

  const timeIn = moment(TimeIn, 'HH:mm:ss');
  const timeOut = moment(TimeOut, 'HH:mm:ss');
  
  // Get only the time portion in HH:mm format
  const formattedTimeIn = timeIn.format('HH:mm');
  const formattedTimeOut = timeOut.format('HH:mm');
  
  console.log('Values to be inserted:', formattedTimeIn, formattedTimeOut);
  

  // Calculate Late In
  // Calculate Late In only if timeIn is after 9:30

  const lateInThreshold = moment().set('hour', 9).set('minute', 30);
const Late_In = timeIn.isAfter(lateInThreshold) ? timeIn.diff(lateInThreshold, 'minutes') : 0;

// Calculate Early Out
const earlyOutThreshold = moment().set('hour', 19).set('minute', 0); // Assuming 7 PM
const EarlyOut = earlyOutThreshold.isAfter(timeOut) ? earlyOutThreshold.diff(timeOut, 'minutes') : 0;
  // Calculate Total Hours
  const Total_Hours = timeOut.diff(timeIn, 'hours', true);

  // Calculate Extra Time (if any)
  const ExtraTime = Math.max(0, Total_Hours - 9.5);

  // Calculate Shortfall Hours
  const Shortfall_Hrs = Math.max(0, 9.5 - Total_Hours);

  // Assuming you have a SQL query to update these values in your database
  const statement = `
    UPDATE reporting
    SET TimeIn = ?,
        TimeOut = ?,
        Late_In = ?,
        EarlyOut = ?,
        Shortfall_Hrs = ?,
        Total_Hours = ?,
        ExtraTime = ?
    WHERE R_Id = ?
  `;

  const data = [
    timeIn.format('HH:mm:ss'), // Adjust the format based on your database column type
    timeOut.format('HH:mm:ss'), // Adjust the format based on your database column type
    Late_In,
    EarlyOut,
    Shortfall_Hrs,
    Total_Hours,
    ExtraTime,
    R_Id,
  ];

  db.pool.query(statement, data, (error, results) => {
    if (error) {
      console.error("Error updating data:", error);
      return res.status(500).json({ error: "Internal Server Error", details: error.message });
    } else {
      console.log("Data updated successfully");
      return res.status(200).json({ message: "Data updated successfully" });
    }
  });
});



/*
// GET EMPLOYEE REPORTING DETAILS HERE USING USER RID 
*/

router.get("/reportingdetail/:Rid", (request, response) => {
  const { Rid } = request.params;

  const statement = `

  SELECT hrms.registration.*, reporting.*
  FROM registration
  LEFT JOIN reporting ON hrms.registration.Rid = reporting.Rid
  WHERE hrms.registration.Rid =?;
    `;

  db.pool.query(statement, [Rid], (error, result) => {
    response.send(utils.createResult(error, result));
  });
});

// Get Employee details here using managerid
// manager can access user reporting details
router.get("/reportingdetail/mid/:Manager_Id", (request, response) => {
  const { Manager_Id } = request.params;

  const statement = `
    SELECT hrms.registration.*, hrms.reporting.*
    FROM registration
    LEFT JOIN reporting ON hrms.registration.Rid = hrms.reporting.Rid
    WHERE hrms.reporting.Manager_Id = ?;
  `;

  db.pool.query(statement, [Manager_Id], (error, result) => {
    if (error) {
      console.error("Database error: " + error.message);
      return response.status(500).json({ error: "Internal server error" });
    }

    if (result.length === 0) {
      // No data found for the given Manager_Id
      return response.status(404).json({ message: "No data found" });
    }

    // Data found, send the result
    response.status(200).json(result);
  });
});

// GET ALL DATA HERE
// FOR ADMIN CAN TRACK HERE EMPLOYEE REPORTING OR NOT
router.get("/reportingdetails/", (request, response) => {
  const statement = `
      select * from reporting;
    `;

  db.pool.query(statement, (error, result) => {
    if (error) {
      console.error("Database error: " + error.message);
      response.status(500).json({ error: "Internal server error" });
    } else {
      response.status(200).json(result);
    }
    // response.send(utils.createResult(error, result));
  });
});

// **********************************************************************
// Reporting Manager end here
// **********************************************************************

router.get("/:Apply_Id", (request, response) => {
  const { Apply_Id } = request.params;

  const statement = `
    select registration.empno,registration.firstName,registration.email,reporting.Time_In,reporting.Time_Out,
            reporting.Date,reporting.Reason,reporting.ReportingId,
              registration.Rid
    from registration 
    inner join reporting on registration.Rid=reporting.Apply_Id 
    where registration.Rid=?;
    `;

  db.pool.query(statement, [Apply_Id], (error, result) => {
    if (error) {
      console.error("Database error: " + error.message);
      response.status(500).json({ error: "Internal server error" });
    } else {
      response.status(200).json(result);
    }
  });
});

// Get All days Atteandense Data Here

// router.get("/details/:rid", (request, response) => {
//   const { rid } = request.params;
//   const statement = `
//   SELECT * from reporting where rid=?;`;

//   db.pool.query(statement, (error, result) => {
//     response.send(utils.createResult(error, result));
//   });
// });

// Get days Atteandense Data Here
//   get specific record

// router.get("/get/:Apply_Id", (request, response) => {
//   const { Apply_Id } = request.params;

//   const statement = `
//     select registration.empno,registration.firstName,registration.email,reporting.Time_In,reporting.Time_Out,
//             reporting.Date,reporting.Reason,reporting.ReportingId,
//               registration.rid
//     from registration
//     inner join reporting on registration.rid=reporting.Apply_Id
//     where registration.rid=?;
//     `;

//   db.pool.query(statement, [Apply_Id], (error, result) => {
//     response.send(utils.createResult(error, result));
//   });
// });

// "ReportingId": 1,
// "Time_In": "10:07:00",
// "Time_Out": "10:07:00",
// "Date": "2023-10-08T18:30:00.000Z",
// "Reason": null,
// "Apply_id": 102,
// "Department": null,
// "Creation_Date": "2023-10-09T04:37:00.000Z",
// "Status": null,
// "Manager_Id": null

// ***************************************************************
// GET REPORTING DATA FROM USER ID
// ***************************************************************

// router.get("/details/rid", (request, response) => {
//   const statement = `
// SELECT reporting.*, registration.*
// FROM reporting
// INNER JOIN registration ON reporting.ReportingId = registration.rid
// WHERE reporting.ReportingId = ?
// `;

//   db.pool.query(statement, (error, result) => {
//     response.send(utils.createResult(error, result));
//   });
// });

// ************************************************************
// Get days wise Atteandense Data Here  using id
// ************************************************************
router.get("/reportingdetails/", (request, response) => {
  const statement = `
    select registration.empno,registration.firstName,reporting.ReportingId,reporting.Time_In,
    reporting.Time_Out,reporting.Date, reporting.Reason from registration
     inner join reporting on registration.Rid=reporting.ReportingId;
    `;

  db.pool.query(statement, (error, result) => {
    response.send(utils.createResult(error, result));
  });
});

// Get days Atteandense Data Here
//get specific record

// router.get("/:rid", (request, response) => {
//   const { rid } = request.params;

//   const statement = `
//     select registration.empno,reporting.timeIn,reporting.timeOut,reporting.date,reporting.reason,
//     reporting.ReportingId,registration.rid from registration
//      inner join reporting on registration.rid=reporting.rid where registration.rid=?;
//     `;

//   db.pool.query(statement, [rid], (error, result) => {
//     response.send(utils.createResult(error, result));
//   });
// });

// Update Data days Atteandense Data Here
//  USING ID USER CAN UPDATE HIS STATUS
router.put("/reportedit/:R_Id", (request, response) => {
  const { ReportingId } = request.params;
  const { Status } = request.body;

  const statement = `UPDATE reporting SET Status = ? WHERE R_Id = ?`;

  db.pool.query(statement, [Status, ReportingId], (error, result) => {
    response.send(utils.createResult(error, result));
  });
});

// router.post("/rep/:ReportingId", (request, response) => {
//   const { ReportingId } = request.params;
//   const { Time_In, Time_Out, Status } = request.body;

//   // Check if the Status is "accepted"
//   if (Status === "approve") {
//     // Calculate the duration in hours
//     const timeInDate = new Date(Time_In);
//     const timeOutDate = new Date(Time_Out);
//     const duration = (timeOutDate - timeInDate) / 3600000;

//     // Check if the duration is less than 9.5 hours
//     if (duration < 9.5) {
//       // Adjust time_out to make it at least 9.30 hours
//       const adjustedTimeOutDate = new Date(timeInDate.getTime() + 9.5 * 3600000);

//       // Update the database entry with adjusted time_out
//       const updateStatement = `UPDATE reporting SET Time_In = ?, Time_Out = ? WHERE ReportingId = ?`;
//       db.pool.query(updateStatement, [Time_In, adjustedTimeOutDate, ReportingId], (error, result) => {
//         response.send({ message: 'Time entry updated successfully' });
//       });
//     } else {
//       // Update the database entry with the provided times
//       const updateStatement = `UPDATE reporting SET Time_In = ?, Time_Out = ? WHERE ReportingId = ?`;
//       db.pool.query(updateStatement, [Time_In, Time_Out, ReportingId], (error, result) => {
//         response.send({ message: 'Time entry updated successfully' });
//       });
//     }
//   } else {
//     // If Status is not "accepted," simply update the database entry with the provided times
//     const updateStatement = `UPDATE reporting SET Time_In = ?, Time_Out = ? WHERE ReportingId = ?`;
//     db.pool.query(updateStatement, [Time_In, Time_Out, ReportingId], (error, result) => {
//       response.send({ message: 'Time entry updated successfully' });
//     });
//   }
// });

// regulize time to reporting updating time_in and time_out

router.put("/Regulize/:R_Id", (request, response) => {
  const { R_Id } = request.params;
  const { Time_In, Time_Out } = request.body;

  // Calculate the duration in hours
  const timeInDate = new Date(Time_In);
  const timeOutDate = new Date(Time_Out);
  const duration = (timeOutDate - timeInDate) / 3600000;

  if (duration < 9.5) {
    const adjustedTimeOutDate = new Date(timeInDate.getTime() + 9.5 * 3600000);

    const updatestmt = `UPDATE reporting SET Time_In = ?, Time_Out = ? WHERE R_Id = ?`;
    db.pool.query(
      updatestmt,
      [Time_In, adjustedTimeOutDate, ReportingId],
      (error, result) => {
        response.send({ message: "Time entry updated successfully" });
      }
    );
  } else {
    // Update the database entry with the provided times
    const updatestmt = `UPDATE reporting SET Time_In = ?, Time_Out = ? WHERE R_Id = ?`;
    db.pool.query(
      updatestmt,
      [Time_In, Time_Out, ReportingId],
      (error, result) => {
        response.send({ message: "regulize successfully" });
      }
    );
  }
});

// Get delete Atteandense Data Here
router.delete("/deletreport/:R_Id", (request, response) => {
  const { ReportingId } = request.params;

  const statement = `
    delete reporting from reporting inner join registration
     on registration.Rid=reporting.Rid where reporting.R_Id=?;
    `;

  db.pool.query(statement, [ReportingId], (error, result) => {
    response.send(utils.createResult(error, result));
  });
});

// select * from registration, reporting
// where registration.empno,registration.managerid= reporting.ReportingId;

module.exports = router;
