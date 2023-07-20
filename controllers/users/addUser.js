const User = require('../../models/user')

const addUser = async (req, res) => {
  try {
    const user = await new User({ ...req.body })

    await user.save()
    return res.status(200).json({ msg: 'User Created' })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ msg: 'Error Occured' })
  }
}

module.exports = addUser
