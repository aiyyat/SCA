const express = require('express');
const router = express.Router();
const { getFirstNRSSFeed } = require('../utilities/rss-parser');
const rss_url = "https://www.nasa.gov/rss/dyn/Houston-We-Have-a-Podcast.rss"

router.get("/all", async (request, response) => {
    const result = await getFirstNRSSFeed(rss_url);
    response.status(200).send({ result })
});

router.get("/sort", async (request, response) => {
    const sort = request.query.order || `des`;
    const result = await getFirstNRSSFeed(rss_url,sort);
    response.status(200).send({ result })
});
module.exports = router;