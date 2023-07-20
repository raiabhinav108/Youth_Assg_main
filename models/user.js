const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  name: 'String',
  password: 'String',
  isAdmin: {
    type: 'Boolean',
    default: false,
  },
})

userSchema.pre('save', async function (next) {
  try {
    let doc = this
    if (doc.password) {
      const hashedPassword = await bcrypt.hash(doc.password, 10)
      doc.password = hashedPassword
    }
    next()
  } catch (err) {
    next(err)
  }
})

userSchema.statics.findByToken = (token, Users, cb) => {
  jwt.verify(token, process.env.JWT_SECRET_KEY, function (err, decode) {
    if (err) {
      console.log(err)
      if (err.name === 'TokenExpiredError') return cb('Token Expired')
      else if (err.message === 'jwt malformed') return cb('Token Malformed')
      else if (err.message === 'jwt signature is required')
        return cb('Token Signature required')
      else if (err.message === 'invalid signature')
        return cb('Token Signature Invalid')
      else return cb('Error with Token')
    }

    Users.findOne(
      {
        _id: decode,
      },
      function (err, user) {
        if (err) return cb(err)
        else return cb(null, user)
      }
    )
  })
}

module.exports = mongoose.model('Users', userSchema)
