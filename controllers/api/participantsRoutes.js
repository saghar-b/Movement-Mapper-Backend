const router = require('express').Router();
const jwt = require("jsonwebtoken")
const { Challenge, Participants } = require('../../models');

// create new challenges
router.post("/new", (req, res) => {
    const toekn = req.headers?.authorization?.split(" ").pop();
    jwt.verify(toekn, process.env.JWT_SECRET, (err, data) => {
        if (err) {
            console.log(err);
            res.status(403).json({ msg: "Invalid credentials, err" });
        }
        else {
            Participants.create(req.body)
            .then(newLog => {
                res.json(newLog);
              
            })
            .catch(err => {
              console.log(err);
              res.status(500).json({ msg: "This username  exist.Please use another username ", err });
            });

        }
    });

});

module.exports = router;
