const router = require('express').Router();

const userRoutes = require('./userRoutes');
router.use('/users', userRoutes);


const challengesRoutes = require('./challengesRoutes');
router.use('/challenges', challengesRoutes);

module.exports = router;