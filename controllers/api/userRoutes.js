const router = require('express').Router();
const jwt = require("jsonwebtoken")
const { User } = require('../../models');
const bcrypt = require("bcrypt");

// login
router.post('/login', async (req, res) => {
  // try {
    const foundUser = await User.findOne({
      where: {
        user_name: req.body.user_name
      }
    })
    if (!foundUser) {
      return res.status(400).json({ msg: "wrong login credentials" })
    }
    if (bcrypt.compareSync(req.body.password, foundUser.password)) {
      const token = jwt.sign({

        user_name: foundUser.user_name,
        id: foundUser.id

      },
        process.env.JWT_SECRET,
        {
          expiresIn: "2h"
        }
      );
     
    
      return res.json({
        token: token,
        user: foundUser
      })
      

    } else {
      return res.status(400).json({ msg: "wrong login credentials" })
    }
  
});


// signup
router.post("/signup", (req, res) => {
  User.create(req.body)
    .then(newUser => {
      const token = jwt.sign({

        user_name: newUser.user_name,
        id: newUser.id

      },
        process.env.JWT_SECRET,
        {
          expiresIn: "2h"
        }
      );
     
    
      return res.json({
        token: token,
        user: newUser
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "This username  exist.Please use another username ", err });
    });
});
module.exports = router;
