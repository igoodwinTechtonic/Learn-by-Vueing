const router = require('express').Router();

const { getLinkPreview } = require('link-preview-js');

router.post('/', async (req, res) => {
  const data = await getLinkPreview(req.body.link, {
    headers: {
      "user-agent": "googlebot"
    }
  })
  if (data.images) delete data.images
  if (data.mediaType) delete data.mediaType
  if (data.contentType) delete data.contentType
  if (data.videos) delete data.videos
  if (data.favicons) {
    data.favicon = data.favicons[0]
    delete data.favicons
  }
  res.send(data)
})

module.exports = router;
