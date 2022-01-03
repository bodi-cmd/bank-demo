const clientController = require('../controllers/client.controller')

const {checkAuthenticated, checkNotAuthenticated} = require("../middleware/auth.middleware");
const {checkIfClient} = require("../middleware/roles.middleware")

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
    
    app.get('/',checkAuthenticated,checkIfClient, clientController.dashboard)

    app.post('/new-account', checkAuthenticated, checkIfClient, clientController.newAcc)

    app.get('/tranzactii/:iban', checkAuthenticated, checkIfClient, clientController.getTransactions)
    app.get('/new-transaction', checkAuthenticated, checkIfClient, clientController.newTransaction)
    app.get('/add-contact',checkAuthenticated, checkIfClient, clientController.addContact)
    
    app.get('/contacts',checkAuthenticated, checkIfClient, clientController.getContacts)

    app.get('/my-profile',checkAuthenticated, checkIfClient, clientController.getUserData)

    
}