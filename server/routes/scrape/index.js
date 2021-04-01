const router = require('express').Router();

const { getLinkPreview } = require('link-preview-js');

router.post('/', (req, res) => {
  getLinkPreview(req.body.link, {
    headers: {
      "user-agent": "googlebot"
    }
  }).then(data => res.send(data))
})

module.exports = router;
