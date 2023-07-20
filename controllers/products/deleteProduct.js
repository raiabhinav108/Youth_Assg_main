const Product = require('../../models/product')
const { isValidObjectId } = require('mongoose')
const { findOneAndDelete } = require('../../models/product')

const deleteProduct = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.productId)) {
      return res.status(403).json({ msg: 'Invalid ProductId' })
    }

    const product = await Product.find({ _id: req.params.productId })

    if (!product) {
      return res.status(404).json({ msg: 'Product not Found' })
    }

    const deletedProduct = await Product.findOneAndDelete({
      _id: req.params.productId,
    })

    return res.status(200).json({ msg: 'Product Deleted' })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ msg: 'Error Occured' })
  }
}

module.exports = deleteProduct
