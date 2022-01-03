const bcrypt = require("bcrypt");
const { connection } = require("../config/db");



module.exports.manage  = (req,res) => {
    var user_cnp = req.user.CNP;
    //console.log(user_cnp);
  
    connection.query('CALL get_employee_by_cnp(?)',user_cnp, (err, userRow) => {
      if(err){
          console.log(err);
            res.status(500).send("Database Error!");
            return;
          }
          connection.query('CALL get_all_transactions("PENDING")', (err, transactionRows) => {
            if(err){
                console.log(err);
                  res.status(500).send("Database Error!");
                  return;
                }
                const frontData = {
                    user: userRow[0][0],
                    transactions: transactionRows[0]
                  };
                  res.render('manage.ejs',{...frontData});
          });
    });

  }
  module.exports.confirmTransaction  = (req,res) => {
    const user_cnp = req.user.CNP;
    var respStatus = req.params.status;

    if(respStatus == "approve"){
      respStatus = "VALID";
      console.log("VALID "+req.params.trID)
    }
    else if(respStatus == "deny"){
      respStatus = "DENIED";
      console.log("DENIED "+req.params.trID)
    }
    else{
      res.status(500).send("INCORRECT STATUS STATUS");
      return;
    }

    const params = [];
    params.push(user_cnp);
    params.push(req.params.trID);
    params.push(respStatus);
  
    connection.query('CALL respond_transaction(?,?,?)',params, (err, response) => {
      if(err){
          console.log(err);
            res.status(500).send("Database Error!");
            return;
          }
      res.send("SUCCES");
    });

  }