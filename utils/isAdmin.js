const isAdmin = (req, res, next) => {
  if (req.user.isAdmin) {
    next()
  } else {
    return res.status(403).json({ msg: 'Only Admin Allowed' })
  }
}

module.exports = isAdmin
