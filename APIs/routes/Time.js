const express = require("express");
const db = require("../db");
const utils = require("../utils");
const config = require("../config");
const cryptoJs = require("crypto-js");
const router = express.Router();










//working with R_Id   http://localhost:4000/timereg/time
router.post("/time/", (request, response) => {
  const {Reporting_Id, TimeIn, TimeOut, Date, Reason, ApplyId, Department, CreationDate, Status, Manager_Id } = request.body;

  const statement = `
      INSERT INTO reporting
          (Reporting_Id, TimeIn, TimeOut, Date, Reason, ApplyId, Department, CreationDate, Status, Manager_Id ) 
      VALUES (?, ?, ?,?,?,?, ?, ?,?,?)
    `;

  db.pool.query(
    statement,
    [Reporting_Id, TimeIn, TimeOut, Date, Reason, ApplyId, Department, CreationDate, Status, Manager_Id ],
    (error, result) => {
      response.send(utils.createResult(error, result));
    }
  );
});





// get todays attendence here using todays date 

router.get("/todayattendence/CreationDate", (request, response) => {
  // Get today's date in the format YYYY-MM-DD
  const Date = new Date().toISOString().split('T')[0];

  const statement = `
    SELECT * FROM reporting WHERE date = ?
  `;

  db.pool.query(statement, [Date], (error, result) => {
    response.send(utils.createResult(error, result));
  });
});






// router.post('/time', (request, response) => {
//   const {TimeIn,TimeOut,
//       Date,R_Id,status} = request.body

//   const statement = `
//     INSERT INTO reporting
//         (TimeIn,TimeOut,
//           Date,R_Id,status)
//     VALUES (?, ?, ?,?,?)
//   `

//   db.pool.query(statement, [TimeIn,TimeOut,
//       Date,R_Id,status], (error, result) => {
//       response.send(utils.createResult(error, result))
//     })
// })

//reoving R_Id column
router.post("/timee", (request, response) => {
  const { TimeIn, TimeOut, Date } = request.body;

  const statement = `
      INSERT INTO reporting
          (TimeIn,TimeOut,
            Date)
      VALUES (?, ?, ?)
    `;

  db.pool.query(statement, [TimeIn, TimeOut, Date], (error, result) => {
    response.send(utils.createResult(error, result));
  });
});

// db.pool.query(statement,[TimeIn,TimeOut,Date], (error, users) => {
//   const result = {}
//   if (error) {
//     result['status'] = 'error'
//     result['error'] = error
//   } else if (users.length === 0) {
//     result['status'] = 'error'
//     result['errs.lor'] = 'user not found'
//   } else {
//   // get the first user from the array
//     const user = users[0]
//     const payload = { id: user['Rid'] }
//     const token = jwt.sign(payload, config.secret)

//     result['status'] = 'success'
//     result['data'] = {
//       idd:`${user['Rid']}`,
//       namee:`${user['TimeIn']}`,

//       token,
//     }
//   }

//   response.send(result)
// })

//update with id
router.put("/:id", (request, response) => {
  const { id } = request.params;
  const { TimeOut } = request.body;

  const statement = `
    update  reporting set TimeOut=? where id=?
    `;

  db.pool.query(statement, [TimeOut, id], (error, result) => {
    response.send(utils.createResult(error, result));
  });
});

//select data all

router.get("/", (request, response) => {
  const statement = `
    select * from reporting
    `;

  db.pool.query(statement, (error, result) => {
    response.send(utils.createResult(error, result));
  });
});

//select particular data
router.get("/:id", (request, response) => {
  const { id } = request.params;

  const statement = `
    select * from reporting where id=?
    `;

  db.pool.query(statement, [id], (error, result) => {
    response.send(utils.createResult(error, result));
  });
});

//select data with limit

router.post("/R_Id/", (request, response) => {
  const { R_Id } = request.body;

  const statement = `
    select TimeIn from reporting  where R_Id=?  limit 1
    `;

  db.pool.query(statement, [R_Id], (error, result) => {
    response.send(utils.createResult(error, result));
  });
});

//http://localhost:4000/timereg/2/2023-07-06
// router.get('/:Rid/:Date', (request, response) => {
//   const {Rid,Date} = request.params

//    const statement = `
//    select registration.Rid,registration.Name ,reporting.TimeIn from registration inner join reporting on registration.Rid=reporting.R_Id where registration.Rid=? and reporting.Date=?
//    `

//    db.pool.query(statement,[Rid,Date] ,(error, result) => {
//        response.send(utils.createResult(error, result))
//      })
//  })

//working fine with get method timedate and Rid
router.get("/:R_Id/:Date", (request, response) => {
  const { R_Id, Date } = request.params;
  const statement = `
     select registration.Rid,registration.Name ,reporting.TimeIn from registration inner join reporting on registration.Rid=reporting.R_Id where reporting.R_Id=? and reporting.Date=?
     `;
  db.pool.query(statement, [R_Id, Date], (error, result) => {
    response.send(utils.createResult(error, result));
  });
});

//update inner join put method using  working fine
router.put("/:R_Id/:Date", (request, response) => {
  const { R_Id, Date } = request.params;
  const { TimeOut } = request.body;
  const statement = `
     update registration inner join reporting on registration.Rid=reporting.R_Id set TimeOut=current_time() where reporting.R_Id=? and reporting.Date=? limit 1;
     `;
  db.pool.query(statement, [R_Id, Date, TimeOut], (error, result) => {
    response.send(utils.createResult(error, result));
  });
});

//get specific data time In and Out details after TimeOut

//working fine with get method timedate and Rid
router.get("/get/:R_Id/:Date", (request, response) => {
  const { R_Id, Date } = request.params;
  const statement = `
 select registration.Rid,registration.Name,reporting.TimeIn,reporting.TimeOut,reporting.Date,reporting.status from registration inner join reporting on registration.Rid=reporting.R_Id where reporting.R_Id=? and reporting.Date=? limit 1;
   `;
  db.pool.query(statement, [R_Id, Date], (error, result) => {
    response.send(utils.createResult(error, result));
  });
});

router.put("/:id", (request, response) => {
  const { id } = request.params;
  const { TimeOut } = request.body;

  const statement = `
    update  reporting set TimeOut=? where R_Id=?
    `;

  db.pool.query(statement, [TimeOut, id], (error, result) => {
    response.send(utils.createResult(error, result));
  });
});

router.put("/:TimeIn", (request, response) => {
  const { TimeIn } = request.params;
  const { TimeOut } = request.body;

  const statement = `
    update  reporting set TimeOut=? where TimeIn=?
    `;

  db.pool.query(statement, [TimeIn, TimeOut], (error, result) => {
    response.send(utils.createResult(error, result));
  });
});

module.exports = router;
