const router = require('express').Router();
const path = require('path');

const apiRoutes = require('./api');
const scrapeRoute = require('./scrape');

router.use('/scrape', scrapeRoute);
router.use('/api', apiRoutes);

router.route('/*')
  .get((req, res) => {
    if (process.env.NODE_ENV === 'development') {
      res.sendFile(path.join(__dirname, '../../client/public/index.html'));
    }
    if (process.env.NODE_ENV === 'production') {
      res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
    }
  });

module.exports = router;
