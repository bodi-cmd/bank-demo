const clientController = require('../controllers/client.controller')
const {checkAuthenticated, checkNotAuthenticated} = require("../middleware/auth.middleware");
const {checkIfClient, checkIfAdmin, checkIfEmployee} = require("../middleware/roles.middleware")

const passport = require('passport')

module.exports = (app) =>{
    
    app.post('/register', checkNotAuthenticated, clientController.register)
    app.get('/register', checkNotAuthenticated, clientController.getRegister)

    app.get('/login', checkNotAuthenticated, clientController.getLogin)
    app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    }))

    app.get('/logout', (req, res) => {
        req.logOut()
        res.redirect('/login')
      })
    
    app.get('/',checkAuthenticated, clientController.dashboard)

    app.post('/new-account', checkAuthenticated, clientController.newAcc)

    app.get('/tranzactii/:iban', checkAuthenticated, clientController.getTransactions)
    app.get('/new-transaction', checkAuthenticated, clientController.newTransaction)
    app.get('/add-contact',checkAuthenticated,clientController.addContact)
    
    app.get('/contacts',checkAuthenticated,clientController.getContacts)

    app.get('/my-profile',checkAuthenticated,clientController.getUserData)

}