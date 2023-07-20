const User = require('../../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const login = async (req, res) => {
  try {
    const findUser = await User.findOne({ name: req.body.name }).lean()

    if (!findUser) {
      return res.status(404).json({ msg: 'User not Found' })
    }
    console.log(process.env.JWT_SECRET_KEY)

    bcrypt.compare(
      req.body.password,
      findUser.password,
      function (err, isMatch) {
        if (err) {
          return res.status(500).json({ msg: 'Error Occured' })
        } else {
          if (isMatch) {
            const token = jwt.sign(
              findUser._id.toHexString(),
              process.env.JWT_SECRET_KEY
            )
            res.status(200).json({ token: token })
          } else {
            return res.status(400).json({ msg: 'Incorrect Password' })
          }
        }
      }
    )
  } catch (err) {
    return res.status(500).json({ msg: 'Error occured' })
  }
}

module.exports = login
