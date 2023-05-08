const router= required('express').Router();

const apiRoutes = require('./api/index');



router.use('/api', apiRoutes);