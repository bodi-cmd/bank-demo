const bcrypt = require("bcrypt");
const { connection } = require("../config/db");

module.exports.register = async (req,res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
  
        const cont = {
          username:req.body.username,
          cnp:req.body.cnp,
          pass:hashedPassword,
          nume:req.body.lastName,
          prenume:req.body.firstName,
          adresa:req.body.adresa,
          tel:req.body.phone,
          birth:req.body.birth,
          sursa_venit:"RO",
          email:req.body.email
          };
  
          const params = Object.keys(cont).map(function(key) {
              return cont[key];
          });

          //console.log(params);

          connection.query('CALL register_client(?,?,?,?,?,?,?,?,?,?)', params, (err, response) => {
            if(err){
                console.log(err);
                  res.status(500).send("Database Error!");
                  return;
                }
                res.redirect('/login')
              });
      } catch {
        res.redirect('/register')
      }
}

module.exports.dashboard  = (req,res) => {
  var user_cnp = req.user.CNP;
  //console.log(user_cnp);

  connection.query('CALL get_user_by_cnp(?)',user_cnp, (err, userRow) => {
    if(err){
        console.log(err);
          res.status(500).send("Database Error!");
          return;
        }
        connection.query('CALL get_accounts(?)',user_cnp, (err, accountRows) => {
          if(err){
              console.log(err);
                res.status(500).send("Database Error!");
                return;
              }
              // console.log(userRow[0][0]);
              // console.log(accountRows[0]);

              
              if(accountRows[0].length){
                const firstAccountIBAN = accountRows[0][0].IBAN;
                const params = [];
                params.push(req.user.CNP);
                params.push(firstAccountIBAN);
                
                connection.query('CALL get_transactions(?,?)',params, (err, transactionRows) => {
                  if(err){
                        res.status(500).send("Database Error!");
                        console.log(err);
                        return;
                      }
                      // console.log(userRow[0][0]);
                      // console.log(accountRows[0]);
                      //console.log(transactionRows[0]);

                      const frontData = {
                        user: userRow[0][0],
                        accounts: accountRows[0],
                        transactions: transactionRows[0]
                      };
                      res.render('dashboard.ejs',{...frontData});
                });
              }
              else{
                const frontData = {
                  user: userRow[0][0],
                  accounts: [],
                  transactions: []
                };
                res.render('dashboard.ejs',{...frontData});

              }
              //res.render('dashboard.ejs',{user: userRow[0][0] , accounts:accountRows[0]});
        });
  });
}

module.exports.getTransactions = (req,res) => {
  const params = [];
  params.push(req.user.CNP);
  params.push(req.params.iban);
  connection.query('CALL get_transactions(?,?)',params, (err, transactionRows) => {
    if(err){
          res.status(500).send("Database Error!");
          console.log(err);
          return;
        }
        //console.log(transactionRows[0]);
        res.send(transactionRows[0]);
  });
}

module.exports.addContact = (req,res) => {
  const params = [];
  params.push(req.user.CNP);
  params.push(req.query.name);
  params.push(req.query.iban);
  connection.query('CALL add_contact(?,?,?)',params, (err, response) => {
    if(err){
          res.status(500).send("Database Error!");
          console.log(err);
          return;
        }
        //console.log(transactionRows[0]);
        res.send(response[0]);
  });
}

module.exports.getContacts = (req,res) => {
  connection.query('CALL get_contacts(?)',req.user.CNP, (err, response) => {
    if(err){
          res.status(500).send("Database Error!");
          console.log(err);
          return;
        }
        //console.log(response[0]);
        res.send(response[0]);
  });
}


module.exports.newTransaction = (req,res) => {
  const params = [];
  params.push(req.user.CNP);
  params.push(req.query.iban_source);
  params.push(req.query.iban_destination);
  params.push(req.query.name);
  params.push(req.query.sum);

  connection.query('CALL new_transaction(?,?,?,?,?)',params, (err, response) => {
    if(err){
          res.status(200).send("ERROR");
          console.log(err);
          return;
        }
        res.send(response[0]);
  });
}

module.exports.newAcc = (req,res)=>{
  var params = [];
  params.push(req.user.CNP);
  params.push("RO"+makeid(15))
  params.push(15);
  connection.query('CALL create_bank_account(?,?,?)',params, (err, response) => {
    if(err){
        console.log(err);
          res.status(200).send("FAIL");
          return;
        }
        res.status(200).send("SUCCESS");
  });
}


function makeid(length) {
  var result           = '';
  var characters       = 'ROBCRTRS0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * 
charactersLength));
 }
 return result;
}

module.exports.getLogin = (req, res) => {
    res.render('login.ejs')
}
module.exports.getRegister = (req, res) => {
  res.render('registerClient.ejs')
}