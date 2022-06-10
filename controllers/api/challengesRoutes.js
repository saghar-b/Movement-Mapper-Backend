const router = require('express').Router();
const jwt = require("jsonwebtoken")
const { Challenge } = require('../../models');

// create new challenges
router.post("/new", (req, res) => {
    const toekn = req.headers?.authorization?.split(" ").pop();
    jwt.verify(toekn, process.env.JWT_SECRET, (err, data) => {
        if (err) {

            res.status(403).json({ msg: "Invalid credentials, err" });
        }
        else {
            const foundChallenge = Challenge.findOne({

                where: {
                    Challenge_name: req.body.Challenge_name
                }
            }).then(foundChallenge => {
                if (foundChallenge) {
                    return res.status(409).json({ msg: "NO" })
                }
                else {
                    Challenge.create({
                        Challenge_type: req.body.Challenge_type,
                        Challenge_name: req.body.Challenge_name,
                        creator_id: req.body.creator_id,
                        start_time: req.body.start_time,
                        end_time: req.body.end_time,
                        description: req.body.description,
                        picture_path: req.body.picture_path,
                        description: req.body.description,
                        unit: req.body.unit,
                    })
                        .then(newChaallenge => {

                            res.json(newChaallenge);
                        })
                        .then(items => res.json(items))
                        .catch(err => {
                            res.status(500).json({ msg: "an error occured", err });
                        });
                }
            })

        }
    });

});

//delete a Challenge
router.delete("/:id", async (req, res) => {


    try {
        const curEvent = await Challenge.findByPk(req.params.id);
        const delEvent = await Challenge.destroy({
            where: {
                id: req.params.id
            }
        })
        res.json(delEvent);
    } catch (err) {

        res.status(500).json({ msg: "an error occured", err });
    }
});

module.exports = router;
