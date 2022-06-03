const router = require('express').Router();

const userRoutes = require('./userRoutes');
router.use('/users', userRoutes);


const challengesRoutes = require('./challengesRoutes');
router.use('/challenges', challengesRoutes);


const scoresRoutes = require('./scoresRoutes');
router.use('/scores', scoresRoutes);


const imageRoutes = require('./imageRoutes');
router.use('/images', imageRoutes);

module.exports = router;