const express = require("express");
const router = express.Router();
const Order = require("../models/order");

router.get("/", async (req, res) => {
  const user = await Order.all();
  res.json(user);
});

 router.post("/", async (req, res) => {
  const user = await Order.create(req.body);
  if(user){
      res.json(user)
  
  } else{
          res.json({ message: 'order created' })
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