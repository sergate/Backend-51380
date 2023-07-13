const BdProductManager = require("../dao/mongoManager/BdProductManager");




const getProductsBd = async (req, res) => {
  const {limit,page,sort,...query} = req.query;
       const products = await BdProductManager.getProduct( page, limit, sort, query);
       const {docs} = products;
       const state =  products ? "success" : "error";
       if (products){
          res.json({...products, status:state, payload:docs})      
       }else{
        res.json(products)
       }
};
const addProductBd = async (req, res)=>{
  const product = req.body;
    const newproduct = await BdProductManager.addProduct(product);
    if (newproduct){
      res.json(newproduct)    
    }else{
      res.json(newproduct)
          
    }
}


const getProductIdBd = async (req, res)=>{
  const id = req.params.pid 
  const getProductId = await BdProductManager.getProductId(id);
  if (getProductId){
    res.json(getProductId)      
  }else{
    res.json(getProductId)
  }



}

const UpdateProductBd = async (req, res)=>{
  const id = req.params.pid 
  const product = req.body
  const UpdateProductId = await BdProductManager.UpdateProduct(id, product);
  if (UpdateProductId){
     res.json(UpdateProductId)      
  }else{
    res.json(UpdateProductId)  
  }
  

}

const deleteProductBd = async (req, res)=>{
  const id = req.params.pid 
    const deleteproduct = await BdProductManager.DeleteProductId(id);
    if (deleteproduct){
      res.json(deleteproduct)      
    }else{
      res.json(deleteproduct)
    }
}

module.exports ={
    getProductsBd, 
    getProductIdBd,    
    addProductBd,
    UpdateProductBd,     
    deleteProductBd,
}