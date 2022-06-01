const router = require('express').Router();
const jwt = require("jsonwebtoken")
const { Challenge, Scores } = require('../../models');

// create new Log
router.post("/new", (req, res) => {
    console.log(req.body.challenge_id)
    console.log(req.body.user_id)
    const toekn = req.headers?.authorization?.split(" ").pop();
    jwt.verify(toekn, process.env.JWT_SECRET, (err, data) => {
        if (err) {
            console.log(err);
            res.status(403).json({ msg: "Invalid credentials, err" });
        }
        else {
            const foundScore = Scores.findOne({

                where: {
                    challenge_id: req.body.challenge_id,
                    user_id: req.body.user_id
                }
            }).then(foundScore => {
                // if the score exist
                if (foundScore) {
                  
                    const newScore = parseInt(foundScore.distance) + parseInt(req.body.distance)
                   
                    Scores.update({
                        distance: newScore,

                    }, {
                        where: {
                            id: foundScore.id
                        }
                    })
                        .then(updateScore => {

                            res.json(updateScore);
                        })
                        .then(items => res.json(items))
                        .catch(err => {
                            console.log(err);
                            res.status(500).json({ msg: "an error occured", err });
                        });
                }
                // if score doesnt exist
                else {
                   
                    Scores.create(req.body)
                        .then(newScore => {
                            res.json(newScore)
                        })
                        .catch(err => {
                            console.log(err);
                            res.status(500).json({ msg: "fail to create the score ", err });
                        });
                }
            })

        }
    });

});

module.exports = router;
