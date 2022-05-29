const router = require('express').Router();
const jwt = require("jsonwebtoken")
const { User, Challenge, Participate } = require('../models');


// get users with challenges
router.get('/users', async (req, res) => {
    try {
        const foundUser = await User.findAll({
            include: [{
                model: Challenge,
                as: 'challenges'
            },
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

// get challenges with participants
router.get('/challenges', async (req, res) => {

    const toekn = req.headers?.authorization?.split(" ").pop();
    jwt.verify(toekn, process.env.JWT_SECRET, (err, data) => {
        if (err) {
            console.log(err);
            es.status(403).json({ msg: "Invalid credentials, err" });
        }
        else {
            
                const foundUser =  Challenge.findAll({
                    include: [{
                        model: User,
                        as: 'participants'
                    },
                    ]
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

    // }
});
// get users with challenges
router.get('/test', async (req, res) => {
    try {
        const foundUser = await Challenge.findAll({
            include: [{
                model: User,
                as: 'participants'
            },
            ]
        }
        )
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




router.get('/login', (req, res) => {

});


router.get('/signup', (req, res) => {

});


router.get('/logout', (req, res) => {

});

router.get('*', (req, res) => {

})

module.exports = router;
