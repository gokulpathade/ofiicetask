// const express = require('express')
// const db = require('../db')
// const utils = require('../utils')
// const cryptoJs = require('crypto-js')
// // const config = require('../config')
// // const jwt = require('jsonwebtoken')
// // import multer
// const multer = require('multer')

// // define the location where the files will get uplaoded
// const upload = multer({ dest: 'uploads' })

// const router = express.Router()
// //token is working
// router.post('/signup', upload.single('photo'),(request, response) => {
//     // request.file is added by multer
//  // const filename = request.file.filename
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

// module.exports = router

const express = require("express");
const db = require("../db");
const utils = require("../utils");

// import multer
const multer = require("multer");

// define the location where the files will get uplaoded
const upload = multer({ dest: "uploads" });

const router = express.Router();

// upload an image
router.post(
  "/upload-image/:rid",
  upload.single("photo"),
  (request, response) => {
    const { rid } = request.params;

    // request.file is added by multer
    const filename = request.file.filename;

    // update the home with the image
    const statement = `
      UPDATE registration
      SET image = ?
      WHERE rid = ?
    `;

    db.pool.query(statement, [filename, rid], (error, result) => {
      response.send(utils.createResult(error, result));
    });
  }
);




router.post(
  "/upload-imageemp/:empid",
  upload.single("photoo"),
  (request, response) => {
    const { empid } = request.params;

    // request.file is added by multer
    const filename = request.file.filename;

    // update the home with the image
    const statement = `
      UPDATE employee
      SET image = ?
      WHERE empid = ?
    `;

    db.pool.query(statement, [filename, empid], (error, result) => {
      response.send(utils.createResult(error, result));
    });
  }
);

module.exports = router;
