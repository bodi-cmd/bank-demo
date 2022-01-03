const employeeController = require('../controllers/employee.controller')

const {checkAuthenticated, checkNotAuthenticated} = require("../middleware/auth.middleware");
const {checkIfEmployee} = require("../middleware/roles.middleware")

const passport = require('passport')

module.exports = (app) =>{

    app.get('/manage',checkAuthenticated, checkIfEmployee, employeeController.manage)

    app.put('/confirm-transaction-id/:trID/:status',checkAuthenticated, checkIfEmployee,employeeController.confirmTransaction)
}