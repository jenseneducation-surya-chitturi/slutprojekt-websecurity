const express = require("express");
const router = express.Router();
const Order = require("../models/order");
const auth = require("./auth")

router.get("/", auth.auth, async (req, res) => {
  try {
    if (req.user.role === "admin") {
     const user = await Order.find();
      res.json(user);

    } else if (req.user.role === "customer") {
      const user = await Order.getOne(req.user.ID);
      res.json(user);
    }
  } catch (error) {

    res.json({ message: error });
  }
 
});

 router.post("/",auth.auth, async (req, res) => {

  try {
    const user = await Order.create(req.body, req.user.userID);
    res.json(user);
  } catch (error) {
    
    res.json({ message: error });
  }

});

module.exports = router;