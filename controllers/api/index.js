const router = require('express').Router();
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
// const commentRoutes = require('./comment');


router.use('/user',userRoutes);
router.use('/post',postRoutes);
module.exports =router;