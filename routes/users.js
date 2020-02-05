const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user");


router.post("/api/register", async (req, res) => {
    const user = await User.newUser(req.body)
    if (user) {
        res.json(user)
    } else {
        res.send('Something wrong');
    }
});

router.post("/api/auth", async (req, res) => {
    const userAuth = await User.userLogin(req.body)
   if (userAuth) {
       res.json(userAuth)

    } else {
        res.send("You are not authorized");
    }
});

module.exports = router;