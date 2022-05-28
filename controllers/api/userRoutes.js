const router = require('express').Router();
const { User } = require('../../models');
const bcrypt = require("bcrypt");

// login
router.post('/login', async (req, res) => {
  try {
    const foundUser = await User.findOne({
      where: {
        user_name: req.body.user_name
      }
    })
    if (!foundUser) {
      return res.status(400).json({ msg: "wrong login credentials" })
    }
    if (bcrypt.compareSync(req.body.password, foundUser.password)) {
      // console.log(foundUser)
      return res.json(foundUser)
    } else {
      return res.status(400).json({ msg: "wrong login credentials" })
    }
  }
  catch (err) {
    res.status(500).json({ msg: "an error occured", err });
  }
});


// signup
router.post("/signup", (req, res) => {
  User.create(req.body)
    .then(newUser => {
      req.session.user = {
        id: newUser.id,
        user_name: newUser.user_name,
        logged_in: true
      }
      res.json(newUser);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "This username  exist.Please use another username ", err });
    });
});
module.exports = router;
