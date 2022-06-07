const router = require('express').Router();
const sequelize = require('sequelize');
const jwt = require("jsonwebtoken")
const { User, Challenge, Scores } = require('../models');
const Op = require('sequelize').Op;
// get one challenge ID
router.get('/challenges/score/id/:challenge_name', async (req, res) => {


    const foundChalleneg = Challenge.findOne({

        where: {
            challenge_name: req.params.challenge_name,
        }
    }).then(foundChalleneg => {
        if (!foundChalleneg) {
            return res.status(400).json({ msg: "No challenege Found" })
        }
        else {
            return res.json(foundChalleneg)
        }
    })

});

// get users with challenges
router.get('/users', async (req, res) => {
    try {
        const foundUser = await User.findAll({
            include: [{
                model: Challenge,
                as: 'challenges'
            }
            ]
        })
        if (!foundUser) {
            return res.status(400).json({ msg: "No User Found" })
        }
        else {
            return res.json(foundUser)
        }
    }
    catch (err) {
        res.status(500).json({ msg: "an error occured", err });
    }
});
// get one user
router.get('/user/:user_name', async (req, res) => {
    try {
        const foundUser = await User.findOne({
            where: {
                user_name: req.params.user_name,
            }
        })
        if (!foundUser) {
            return res.status(400).json({ msg: "NO" })
        }
        else {
            return res.json(foundUser)
        }
    }
    catch (err) {
        res.status(500).json({ msg: "an error occured", err });
    }
});

// get one challenge
router.get('/challenge/:challenge_id', async (req, res) => {

    const foundChalleneg = Challenge.findOne({
        include: [{
            model: User,
            as: 'scores'
        },
        ],
        where: {
            id: req.params.challenge_id,
            '$scores.score.join$': true,
           
        }
    }).then(foundChalleneg => {
        if (!foundChalleneg) {
            return res.status(400).json({ msg: "No User Found" })
        }
        else {
            return res.json(foundChalleneg)
        }
    })

});

// get all the challenge types
router.get('/challenges/types', async (req, res) => {

    const foundUser = Challenge.findAll({
        attributes: ["challenge_type"],
        group: ['Challenge.challenge_type'],

    }).then(foundUser => {
        if (!foundUser) {
            return res.status(400).json({ msg: "No User Found" })
        }
        else {
            return res.json(foundUser)
        }
    })

});
// check if the user join the challenge
router.get('/challenges/score/:user_id/:challenge_id', async (req, res) => {

    const foundScore = Scores.findOne({
        where: {
            challenge_id: req.params.challenge_id,
            user_id: req.params.user_id,
            join :true
        },

    }).then(foundScore => {
        if (!foundScore) {
            return res.status(400).json({ msg: "NO" })
        }
        else {
            return res.json(foundScore)
        }
    })

});
// // check if the user join the challenge
// router.get('/challenges/score/:user_id/:challenge_id', async (req, res) => {

//     const foundScore = Scores.findOne({
//         where: {
//             challenge_id: req.params.challenge_id,
//             user_id: req.params.user_id,
//             join :true
//         },

//     }).then(foundScore => {
//         if (!foundScore) {
//             return res.status(400).json({ msg: "NO" })
//         }
//         else {
//             return res.json(foundScore)
//         }
//     })

// });
// check if the user join the challenge
// router.get('/challenges/score/pending/:user_id/:challenge_id', async (req, res) => {

//     const foundScore = Scores.findOne({
//         where: {
//             challenge_id: req.params.challenge_id,
//             user_id: req.params.user_id,
//             join :false
//         },

//     }).then(foundScore => {
//         if (!foundScore) {
//             return res.status(400).json({ msg: "NO" })
//         }
//         else {
//             return res.json(foundScore)
//         }
//     })

// });
// get challenges with Participants
router.get('/challenges', async (req, res) => {
    const today = new Date();
    const foundUser = Challenge.findAll({
        include: [{
            model: User,
            as: 'scores'
        },
        ],
        where: { end_time: { [Op.gte]: today } },
        order: ['start_time']
    }).then(foundUser => {
        if (!foundUser) {
            return res.status(400).json({ msg: "No User Found" })
        }
        else {
            return res.json(foundUser)
        }
    })

});
// get challenges with participants for creator
router.get('/challenges/creator/:user_id', async (req, res) => {

    const toekn = req.headers?.authorization?.split(" ").pop();
    jwt.verify(toekn, process.env.JWT_SECRET, (err, data) => {
        if (err) {
            console.log(err);
            res.status(403).json({ msg: "Invalid credentials, err" });
        }
        else {

            const foundUser = Challenge.findAll({
                include: [{
                    model: User,
                    as: 'scores'
                },
                {
                    model: User,
                    as: 'creator',
                    // where: { '$public$': true }
                },
                ],
                where: {
                    creator_id: req.params.user_id
                }
            }).then(foundUser => {
                if (!foundUser) {
                    return res.status(400).json({ msg: "No User Found" })
                }
                else {
                    return res.json(foundUser)
                }
            })
        }
    });
});
// get challenges for creator who joined challenges
router.get('/challenges/joined/:user_id', async (req, res) => {

    const toekn = req.headers?.authorization?.split(" ").pop();
    jwt.verify(toekn, process.env.JWT_SECRET, (err, data) => {
        if (err) {
            console.log(err);
            res.status(403).json({ msg: "Invalid credentials, err" });
        }
        else {

            const foundUser = Challenge.findAll({
                include: [{
                    model: User,
                    as: 'scores'
                }, {
                    model: User,
                    as: 'creator',
                },
                ],
                where: {
                    '$scores.id$': req.params.user_id,
                    '$scores.score.join$': true,
                    creator_id: { [Op.ne]: req.params.user_id }
                }


            }).then(foundUser => {
                if (!foundUser) {
                    return res.status(400).json({ msg: "No User Found" })
                }
                else {
                    return res.json(foundUser)
                }
            })
        }
    });
});
// get challenges for creator who pending challenges
router.get('/challenges/pending/:user_id', async (req, res) => {

    const toekn = req.headers?.authorization?.split(" ").pop();
    jwt.verify(toekn, process.env.JWT_SECRET, (err, data) => {
        if (err) {
            console.log(err);
            res.status(403).json({ msg: "Invalid credentials, err" });
        }
        else {

            const foundUser = Challenge.findAll({
                include: [{
                    model: User,
                    as: 'scores'
                }, {
                    model: User,
                    as: 'creator',
                },
                ],
                where: {
                    '$scores.id$': req.params.user_id,
                    '$scores.score.join$': false,
                    creator_id: { [Op.ne]: req.params.user_id }
                }


            }).then(foundUser => {
                if (!foundUser) {
                    return res.status(400).json({ msg: "No User Found" })
                }
                else {
                    return res.json(foundUser)
                }
            })
        }
    });
});

// //when loged in fileter the one that created by the user
// router.get('/challenges/types/login/:user_id/:Challenge_type', async (req, res) => {

//     const foundChallengeType = Challenge.findAll({
//         include: [{
//             model: User,
//             as: 'scores'
//         }, {
//             model: User,
//             as: 'creator',

//         },
//         ],
//         where: {
//             Challenge_type: req.params.Challenge_type,
//             creator_id: { [Op.ne]: req.params.user_id }

//         }
//     }).then(foundChallengeType => {
//         if (!foundChallengeType) {
//             return res.status(400).json({ msg: "No User Found" })
//         }
//         else {
//             return res.json(foundChallengeType)
//         }
//     })

// });
// get challenges with for specific type
router.get('/challenges/types/no/:Challenge_type', async (req, res) => {

    const foundChallengeType = Challenge.findAll({
        include: [{
            model: User,
            as: 'scores'
        }, {
            model: User,
            as: 'creator',

        },
        ],
        where: {
            Challenge_type: req.params.Challenge_type,
            // creator_id:{[Op.ne]:req.params.user_id}

        }
    }).then(foundChallengeType => {
        if (!foundChallengeType) {
            return res.status(400).json({ msg: "No User Found" })
        }
        else {
            return res.json(foundChallengeType)
        }
    })

});







module.exports = router;
