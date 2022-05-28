const router = require('express').Router();
const { User, Challenge, Participate } = require('../models');


// get users with challenges
router.get('/users',async (req, res) => {
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
router.get('/challenges',async (req, res) => {
    try {
        const foundchallenges = await Challenge.findAll({
            include: [{
                      model: User,
                      as: 'participants'
                    },
                ]
        })
        if (!foundchallenges) {
          return res.status(400).json({ msg: "No Challenges found" })
        }
         else {
            return res.json(foundchallenges)
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
