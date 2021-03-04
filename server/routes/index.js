const router = require('express').Router();
const path = require('path');

const apiRoutes = require('./api');
const scrapeRoute = require('./scrape');

router.use('/scrape', scrapeRoute);
router.use('/api', apiRoutes);

router.route('/')
  .get((req, res) => {
    res.sendFile(path.join(__dirname, '../../client/public/index.html'));
  });

module.exports = router;
