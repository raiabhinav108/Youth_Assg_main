const Product = require('../../models/product')

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({}).lean()
    return res.status(200).json({ data: products })
  } catch (err) {
    return res.status(500).json({ msg: 'Error Occured' })
  }
}

module.exports = getAllProducts
