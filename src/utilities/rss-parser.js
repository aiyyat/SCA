const RSSParser = require('rss-parser');

const parser = new RSSParser();
const convertISODateToAEST = require('./format-iso-date-to-AEST').convertISODateToAEST;

function getRSSFeed(rss_url) {
    try {
        return parser.parseURL(rss_url);
    } catch (error) {
        console.log('Error:', error.message)
    }
}

async function getRSSFeedFiltered(rss_url, sort = 'dsc', n = 10) {
    const direction = sort === 'asc' ? -1 : 1;
    const { items } = await getRSSFeed(rss_url);
    return items
        .sort((a, b) => direction * ((pubDateOf(a) < pubDateOf(b)) ? 1 : -1))
        .slice(0, n);
}

async function getRSSFeedFormatted(rss_url, sort, n) {
    return (await getRSSFeedFiltered(rss_url, sort, n)).map(item => {
        const { title, enclosure, isoDate } = item;
        const audioUrl = enclosure.url;
        const publishedDate = convertISODateToAEST(isoDate);
        return { title, audioUrl, publishedDate };
    });
}

function pubDateOf(item) {
    return new Date(item.isoDate);
}

module.exports = { getRSSFeed, getRSSFeedFiltered, getRSSFeedFormatted }
