const express = require("express");
const router = express.Router();
const Product = require("../models/product");

 router.get("/products", async (req, res) => {
    const user = await Product.all();
    res.json(user);
});

router.get("/products/:id", async (req, res) => {
    const user = await Product.create(req.params.id);
   if(user){
        res.json(user)
    
    } else{
            res.json({ message: 'Product created' })
    }
});

router.post("/products", async (req, res) => {
    const user = await Product.create(req.body);
    if(user){
        res.json(user)
    
    } else{
            res.json({ message: 'Product created' })
    }
});
  

router.patch("/products/:id", async (req, res) => {
    const user = await Product.update(req.params.id, req.body);
    if(user){
        res.json(user)
    
    } else{
            res.json({ message: 'Product updated' })
    }
});

router.delete("/products/:id", async (req, res) => {
    const user = await Product.remove(req.params.id);
    
    if(user){
        res.json(user)
    
    } else{
            res.json({ message: 'Product removed' })
    }
}) 
module.exports = router;
