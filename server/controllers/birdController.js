
const asyncHandler = require('express-async-handler');
const {query} = require('./functions/queriesFunctions');



const getProducts = asyncHandler(async (req, res) => {

  try{
    const sql =`SELECT * from productos;`;                   

        
    let productsExist = false;
    const result = await query(sql);

    if (result.length > 0){
        productsExist = true;
    }   

    if(productsExist){
        res.status(200).json(result)
    } else {
        res.status(200).send('No products found')
    }
  } catch (error) {
      console.error(error);
      res.status(500).send('Error searching for products');
    }
});

const getSingleProduct = asyncHandler(async (req, res) => {
 const id = req.query.id;
  try{
    const sql =`SELECT * from productos WHERE id = ${id};`;                   

        
    let productExist = false;
    const result = await query(sql);

    if (result.length > 0){
        productExist = true;
    }   

    if(productExist){
        res.status(200).json(result)
    } else {
        res.status(200).send('No products found')
    }
  } catch (error) {
      console.error(error);
      res.status(500).send('Error searching for products');
    }
});

module.exports = {
    getProducts,
    getSingleProduct,
};