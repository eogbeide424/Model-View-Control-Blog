const router = require('express').Router();
const userRoutes =require('./userRoutes');
const dashBoardRoutes = require('./dashBoardRoutes');
const postRoutes =require('./postRoutes');

router.use('/users',userRoutes);
router.use('/dash',dashBoardRoutes);
router.use('/post',postRoutes);