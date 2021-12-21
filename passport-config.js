const { authenticate } = require('passport')

const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function initialize(passport,getUserByUsername,getUserByCNP){

    const authenticateUser = async (username,password,done)=>{
         var user = await getUserByUsername(username)
        // user = JSON.stringify(user)
        // console.log(user)
        if(user==null){
            return done(null,false,{message:"no user with that username"})
        }
        try{
            if(await bcrypt.compare(password,user.PASSWORD)){
                return done(null,user)
            }else{
                return done(null,false,{message:"password incorrect"})
            }
        }catch(e){
            return done(e)
        }
    }

    passport.use(new LocalStrategy({usernameField:'username'}, authenticateUser))
    passport.serializeUser((user,done)=>{
        return done(null, {CNP:user.CNP, type: user.TIP_ACC});
    })
    passport.deserializeUser(async (USER_DATA,done)=>{
        return done(null,await getUserByCNP(USER_DATA))
    })
}
module.exports = initialize