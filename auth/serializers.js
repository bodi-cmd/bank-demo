const { connection } = require("../config/db");

module.exports.getUser = (username)=>{
    return new Promise(function(resolve, reject) {
      connection.query('SELECT * FROM credentials WHERE username = ?',username, function(error, response, fields) {
         resolve(response[0]);
           });
      });
}

module.exports.getUserByCNP = (USER_DATA)=>{
    return new Promise(function(resolve, reject) {

      if(USER_DATA.type == "CLIENT"){ 
        connection.query('SELECT * FROM clienti WHERE CNP = ?',USER_DATA.CNP, function(error, response, fields) {
          if(error){
            //console.error(error)
            return
          }
          response[0].type = USER_DATA.type;
          // console.log("RESPONSE")
          // console.log(response[0]);
           resolve(response[0]);
        });
      }
      else if(USER_DATA.type == "ANGAJAT"){ 
        connection.query('SELECT * FROM angajati WHERE CNP = ?',USER_DATA.CNP, function(error, response, fields) {
          if(error){
            //console.error(error)
            return
          }
          response[0].type = USER_DATA.type;
          // console.log("RESPONSE")
          // console.log(response[0]);
           resolve(response[0]);
        });
      }
      });
}