if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }
  const path = require('path')  
  const express = require('express')
  const app = express()
  const passport = require('passport')
  const flash = require('express-flash')
  const session = require('express-session')
  const methodOverride = require('method-override')
  const bodyParser = require('body-parser');
  app.use(express.static(path.join(__dirname, 'public')));

  app.use(bodyParser.urlencoded({extended : true}));
  app.use(bodyParser.json());
  app.set('view-engine', 'ejs')
  app.use(express.urlencoded({ extended: false }))
  app.use(flash())
  app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  }))
  
  app.use(passport.initialize())
  app.use(passport.session())
  app.use(methodOverride('_method'))

  
  const serializer = require("./auth/serializers");


  //PASSPORT SET PASSPORT SET PASSPORT SET PASSPORT SET PASSPORT SET PASSPORT SET PASSPORT SET PASSPORT SET PASSPORT SET PASSPORT SET 
  const initializePassport = require('./passport-config');
  const { response } = require('express');

  initializePassport(passport, serializer.getUser, serializer.getUserByCNP)
  
  require('./routes/client.routes')(app)
  require('./routes/employee.routes')(app)


  /*app.get('/',checkAuthenticated, (req, res) => {

    // connection.query('SELECT postari.ID, NUME, PRENUME, SEX, NASTERE FROM postari INNER JOIN pacienti ON pacienti.ID=postari.ID_P WHERE postari.STATUS = "Inregistrata" ', function(error, response, fields) {
    //   if(error)
    //     res.send(error);
    //   else
    //     res.render(' dashboard.ejs',{sold:123})
    //     });
    // res.render('dashboard.ejs',{sold:123});

    res.send(req.user);
  })

  app.get('/pacient',checkAuthenticated, (req, res) => {

    connection.query('SELECT * FROM postari INNER JOIN pacienti ON pacienti.ID=postari.ID_P WHERE postari.ID ='+req.query.id, function(error, response, fields) {
      if(error){console.log(error);throw error;}
      else{
        console.log(response);
        res.render('pacient.ejs',{user:response[0],id:req.query.id});
      }
        });
  })

  app.post('/reteta',checkAuthenticated,(req,res)=>{

    const update_post = {
      RETETA:req.body.reteta,
      STATUS:'Validata'
    }

    connection.query('UPDATE postari SET ? WHERE ID = '+req.body.id_postare ,update_post,function(error, response, fields) {
      if(error){console.log(error);throw error;}
      else{
        res.redirect('/');
      }
  });
  })
  

 
 


 */

  /*
  
  
  
  app.get('/logout', (req, res) => {
    req.logOut()
    res.redirect('/login')
  })
  */


  
  app.listen(process.env.PORT||3000)