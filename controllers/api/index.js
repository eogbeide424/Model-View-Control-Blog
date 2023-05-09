const router = require('express').Router();
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const commentRoutes = require('./comment');

router.use('/login',userRoutes);
router.use('/user',userRoutes);
router.use('/post',postRoutes);
module.exports =router;