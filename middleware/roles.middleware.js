module.exports.checkIfClient = (req, res, next)=>{
    //console.log(req.user)
    if(req.user == undefined)
        res.redirect('/login');
    if (req.user.type == "CLIENT") {
      return next()
    }
    else if(req.user.type == "ADMIN"){
        res.redirect('/admin')
    }
    else if(req.user.type == "ANGAJAT"){
        res.redirect('/manage')
    }
  }

  module.exports.checkIfAdmin = (req, res, next)=>{
    if(req.user == undefined)
        res.redirect('/login');
    if (req.user.type == "CLIENT") {
        res.redirect('/')
    }
    else if(req.user.type == "ADMIN"){
        return next()
    }
    else if(req.user.type == "ANGAJAT"){
        res.redirect('/manage')
    }
  }

  module.exports.checkIfEmployee = (req, res, next)=>{
    if(req.user == undefined)
        res.redirect('/login');
    if (req.user.type == "CLIENT") {
        res.redirect('/')
    }
    else if(req.user.type == "ADMIN"){
        res.redirect('/admin')
    }
    else if(req.user.type == "ANGAJAT"){
        return next()
    }
  }
