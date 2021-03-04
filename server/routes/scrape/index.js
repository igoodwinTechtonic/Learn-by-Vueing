const router = require('express').Router();

const { getLinkPreview, getPreviewFromContent } = require('link-preview-js');
// const scraper = require('website-scraper');

router.post('/', (req, res) => {
  // console.log(req.body.link)
  getLinkPreview(req.body.link, {
    headers: {
      "user-agent": "googlebot"
    }
  }).then(data => res.send(data))
})

module.exports = router;