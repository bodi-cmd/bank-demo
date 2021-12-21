module.exports.checkIfClient = (req, res, next)=>{
    if(req.user == undefined)
        res.redirect('/login');
    if (req.user.role == "CLIENT") {
      return next()
    }
    else if(req.user.role == "ADMIN"){
        res.redirect('/admin')
    }
    else if(req.user.role == "ANGAJAT"){
        res.redirect('/manage')
    }
  }

  module.exports.checkIfAdmin = (req, res, next)=>{
    if(req.user == undefined)
        res.redirect('/login');
    if (req.user.role == "CLIENT") {
        res.redirect('/')
    }
    else if(req.user.role == "ADMIN"){
        return next()
    }
    else if(req.user.role == "ANGAJAT"){
        res.redirect('/manage')
    }
  }

  module.exports.checkIfEmployee = (req, res, next)=>{
    if(req.user == undefined)
        res.redirect('/login');
    if (req.user.role == "CLIENT") {
        res.redirect('/')
    }
    else if(req.user.role == "ADMIN"){
        res.redirect('/admin')
    }
    else if(req.user.role == "ANGAJAT"){
        return next()
    }
  }
