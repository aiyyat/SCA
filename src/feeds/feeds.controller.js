const express = require('express');
const router = express.Router();
const { getFirstNRSSFeed } = require('../utilities/rss-parser');
const rss_url = "https://www.nasa.gov/rss/dyn/Houston-We-Have-a-Podcast.rss"

router.get("/", async (request, response) => {
    const result = await getFirstNRSSFeed(rss_url);
    response.status(200).send({ result })
});

router.get("/sort", async (request, response) => {
    const feeds = await getFirstNRSSFeed(rss_url, request.query.order || `des`);
    response.status(200).send({ feeds })
});
module.exports = router;