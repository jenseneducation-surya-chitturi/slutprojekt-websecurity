const express = require("express");
const router = express.Router();
const Product = require("../models/product");

/* router.get("/", async (req, res) => {
    res.json({
        message:'done'
    })
})
 */
 router.get("/", async (req, res) => {
    const user = await Product.all();
    res.json(user);
});

router.get("/:id", async (req, res) => {
    const user = await Product.create(req.params.id);
   if(user){
        res.json(user)
    
    } else{
            res.json({ message: 'Product created' })
    }
});

router.post("/", async (req, res) => {
    const user = await Product.create(req.body);
    if(user){
        res.json(user)
    
    } else{
            res.json({ message: 'Product created' })
    }
});
  

router.patch("/:id", async (req, res) => {
    const user = await Product.update(req.params.id, req.body);
    if(user){
        res.json(user)
    
    } else{
            res.json({ message: 'Product updated' })
    }
});

router.delete("/:id", async (req, res) => {
    const user = await Product.remove(req.params.id);
    
    if(user){
        res.json(user)
    
    } else{
            res.json({ message: 'Product removed' })
    }
}) 
module.exports = router;
