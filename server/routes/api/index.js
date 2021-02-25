const router = require('express').Router();

// const bookmarkRoutes = require('./bookmark');
const folderRoutes = require('./folder');

// router.use('/bookmark', bookmarkRoutes);
router.use('/folder', folderRoutes);

module.exports = router;
