const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const auth = require('./auth')

 router.get("/products", async (req, res) => {
    const user = await Product.all();
    res.json(user);
});


router.get('/products/:id',async(req,res)=>{
    const user = await Product.getOne(req.params.id)
    if(user){
        res.json(user)
    }else{
     res.json({ message: 'Product cannot found id '})
    }
    
})

router.post("/products", auth.auth, async (req, res) => {
    if(req.user.role ==="admin"){
        const user = await Product.create(req.body)
            res.json(user)
    
    } else{
            res.json({ message: 'Product created' })
    }
});

router.patch("/products/:id", auth.auth, async (req, res) => {
    if(req.user.role ==="admin"){
        const user = await Product.update(req.params.id,req.body) 
        res.json(user)
    
    } else{
            res.json({ message: 'Product cannot updated' })
    }
});

router.delete("/products/:id",auth.auth, async (req, res) => {
   if(req.user.role ==="admin"){
        const user = await Product.remove(req.params.id)
        res.json(user)
    
    } else{
            res.json({ message: 'Product cannot removed' })
    }
}) 
module.exports = router;
