const Users = require('../models/user')

let authenticate = async (req, res, next) => {
  try {
    // console.log('Header', req.headers)

    if (!req.headers.authorization) res.status(403).end()
    else {
      let token = req.headers.authorization
      if (token == '') {
        res.status(404).json({ msg: 'token missing' })
      } else {
        Users.findByToken(token, Users, (err, user) => {
          //   console.log('User', user)
          if (err) {
            console.log(err)
            res.status(400).json({ msg: err })
          }

          if (!user) {
            res.status(403).end()
          } else {
            req.user = user
            next()
          }
        })
      }
    }
  } catch (err) {
    console.log(err)
    res.status(500).end()
  }
}

module.exports = authenticate
