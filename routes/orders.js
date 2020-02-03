const express = require("express");
const router = express.Router();
const Order = require("../models/order");

router.get("/order", async (req, res) => {
  const user = await Order.all();
  res.json(user);
});

router.get("/order/:id", async (req, res) => {
  const user = await Order.create(req.params.id);
 if(user){
      res.json(user)
  
  } else{
          res.json({ message: 'Product created' })
  }
});

router.post("/order", async (req, res) => {
  const user = await Order.create(req.body);
  if(user){
      res.json(user)
  
  } else{
          res.json({ message: 'Product created' })
  }
});


router.patch("/order:id", async (req, res) => {
  const user = await Order.update(req.params.id, req.body);
  if(user){
      res.json(user)
  
  } else{
          res.json({ message: 'Product updated' })
  }
});

router.delete("/order:id", async (req, res) => {
  const user = await Product.remove(req.params.id);
  
  if(user){
      res.json(user)
  
  } else{
          res.json({ message: 'Product removed' })
  }
}) 
module.exports = router;