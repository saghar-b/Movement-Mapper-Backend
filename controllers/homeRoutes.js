const router = require('express').Router();
const sequelize = require('sequelize');
const jwt = require("jsonwebtoken")
const { User, Challenge, Scores} = require('../models');
const Op = require('sequelize').Op;

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

// get one challenge
router.get('/challenge/:challenge_id', async (req, res) => {

    const foundChalleneg=  Challenge.findOne({
        include: [{
            model: User,
            as: 'scores'
        },
        ],
        where:{
            id:req.params.challenge_id,
        }
    }).then(foundChalleneg =>{
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

    const foundUser =  Challenge.findAll({
        attributes: ["challenge_type"],
        group: ['Challenge.challenge_type'],
        
    }).then(foundUser =>{
        if (!foundUser) {
            return res.status(400).json({ msg: "No User Found" })
        }
        else {
            return res.json(foundUser)
        }
    })
    
});
// get challenges with Participants
router.get('/challenges', async (req, res) => {
    const today = new Date();
    const foundUser =  Challenge.findAll({
        include: [{
            model: User,
            as: 'scores'
        },
        ], 
        where: { end_time: { [Op.gte]: today } },
        order: ['start_time']
    }).then(foundUser =>{
        if (!foundUser) {
            return res.status(400).json({ msg: "No User Found" })
        }
        else {
            return res.json(foundUser)
        }
    })

});
// get challenges with participants for creator
router.get('/challenges/:user_id', async (req, res) => {

    const toekn = req.headers?.authorization?.split(" ").pop();
    jwt.verify(toekn, process.env.JWT_SECRET, (err, data) => {
        if (err) {
            console.log(err);
            res.status(403).json({ msg: "Invalid credentials, err" });
        }
        else {
            
                const foundUser =  Challenge.findAll({
                    include: [{
                        model: User,
                        as: 'scores'
                    },
                    ],
                    where:{
                        creator_id :req.params.user_id
                    }
                }).then(foundUser =>{
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

// get challenges with for specific type
router.get('/challenges/types/:Challenge_type', async (req, res) => {

    const foundChallengeType =  Challenge.findAll({
        include: [{
            model: User,
            as: 'scores'
        },{
            model: User,
            as: 'creator',
            // where: { '$public$': true }
          },
        ],
        where:{
            Challenge_type :req.params.Challenge_type
        }
    }).then(foundChallengeType =>{
        if (!foundChallengeType) {
            return res.status(400).json({ msg: "No User Found" })
        }
        else {
            return res.json(foundChallengeType)
        }
    })
    
});


// get users with challenges
router.get('/logs', async (req, res) => {
    // try {
        console.log(req.body.activity_type)
        console.log("run")
        console.log(req.body.user_id)
        const totalAmount = await Logs.findAll({
            attributes: [
              'user_id',
              [sequelize.fn('sum', sequelize.col('distance')), 'total_distance'],
            ],
            group: ['Logs.user_id'],
            where:{
                activity_type :req.body.activity_type,
                user_id :req.body.user_id

            }
          });
        
        if (!totalAmount) {
            return res.status(400).json({ msg: "No User Found" })
        }
        else {
            return res.json(totalAmount)
        }
    // }
    // catch (err) {
    //     res.status(500).json({ msg: "an error occured", err });
    // }
});




router.get('/login', (req, res) => {

});


router.get('/signup', (req, res) => {

});


router.get('/logout', (req, res) => {

});

router.get('*', (req, res) => {

})

module.exports = router;
