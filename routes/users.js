var express = require('express');
const bcrypt = require('bcrypt');
var router = express.Router();

/********Imported Methods******/
const Employee = require('../models/employee.model');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', async function(req, res, next) {
    const {
        name,
        email,
        password,
        isActive
    } = req.body  
    console.log(req.body);
    let bcryptPassword = await bcrypt.hash(password, 10);

    // create a new user in mongodb
    await Employee.create({
        name,
        email,
        isActive,
        password: bcryptPassword
    });

    return res.status(200).json({
      message:'Signup successful',
      success: true,
    })
});


router.post('/login', async function(req, res, next) {
  try {
    const {
        email,
        password
    } = req.body

    // search for user in mongodb
    const employee = await Employee.findOne({email});
    bcrypt.compare(password, employee.password, function(err, result) {
      if(result) {
        return res.status(200).json({
          message:'Login successful',
          success: true,
        })
      } else {
        return res.status(401).json({
          message:'Login failed',
          success: false,
        })
      }
    });
  }
  catch(err) {
    return res.status(500).json({
      message: 'Internal server error',
      success: false,
      })
  }
});



router.get('/employeeList', async function(req, res, next) {
  try {
    const employee = await Employee.find();
    return res.status(200).json({
      data: employee,
      success: true,
    });
  } catch(err) {
    return res.status(500).json({
      message: 'Internal server error',
      success: false,
    })
  }
});


module.exports = router;
