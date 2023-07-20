const Product = require('../../models/product')
const { isValidObjectId } = require('mongoose')

const updateProduct = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.productId)) {
      return res.status(403).json({ msg: 'Invalid ProductId' })
    }

    const product = await Product.findOne({ _id: req.params.productId }).lean()

    if (!product) {
      return res.status(404).json({ msg: 'Product not Found' })
    }

    const updateProduct = await Product.updateOne(
      { _id: req.params.productId },
      { $set: req.body }
    )
    return res.status(200).json({ msg: 'Product Updated' })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ msg: 'Error Occured' })
  }
}

module.exports = updateProduct
