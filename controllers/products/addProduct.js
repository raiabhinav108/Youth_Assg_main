const Product = require('../../models/product')

const addProduct = async (req, res) => {
  try {
    const product = await new Product({ ...req.body })

    await product.save()
    return res.status(200).json({ msg: 'Product Created' })
  } catch (err) {
    return res.status(500).json({ msg: 'Error Occured' })
  }
}

module.exports = addProduct
