const router = require('express').Router();
const jwt = require("jsonwebtoken")
const { Challenge, Scores } = require('../../models');

// create new Log
router.post("/new", (req, res) => {

    const toekn = req.headers?.authorization?.split(" ").pop();
    jwt.verify(toekn, process.env.JWT_SECRET, (err, data) => {
        if (err) {
            // console.log(err);
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
                        join: "true"

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
                            // console.log(err);
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
                            // console.log(err);
                            res.status(500).json({ msg: "fail to create the score ", err });
                        });
                }
            })

        }
    });

});

// invite to challenge
router.post("/invite", (req, res) => {

    const toekn = req.headers?.authorization?.split(" ").pop();
    jwt.verify(toekn, process.env.JWT_SECRET, (err, data) => {
        if (err) {
            // console.log(err);
            res.status(403).json({ msg: "Invalid credentials, err" });
        }
        else {
            const foundScore = Scores.findOne({

                where: {
                    challenge_id: req.body.challenge_id,
                    user_id: req.body.user_id
                }
            }).then(foundScore => {
                // if already joined
                if (foundScore) {
                    //    return res.json({ msg: "joined" })
                    return res.status(400).json({ msg: "NO" })

                }
                // if not joined
                else {

                    Scores.create(req.body)
                        .then(newScore => {
                            return res.json({ msg: "Invited" })
                        })
                        .catch(err => {
                            // console.log(err);
                            res.status(500).json({ msg: "fail to create the score ", err });
                        });
                }
            })

        }
    });

});

//leave the challenge
router.delete("/:user_id/:challenge_id", (req, res) => {

    Scores.destroy({
        where: {
            user_id: req.params.user_id,
            challenge_id: req.params.challenge_id
        }
    }).then(delScore => {
        res.json(delScore);
    })
        .catch(err => {
            // console.log(err);
            res.status(500).json({ msg: "an error occured", err });
        });
});


module.exports = router;
