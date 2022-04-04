const { getRSSFeed, getFirstNRSSFeed } = require('../rss-parser');

const rss_url = "https://www.nasa.gov/rss/dyn/Houston-We-Have-a-Podcast.rss"
describe('RSS Parser Test', () => {
    it('calls the api and returns an XML', async () => {
        const { items } = await getRSSFeed(rss_url);
        const firstItem = items[0];
        const { title, link, pubDate, content, guid, isoDate } = firstItem;
        expect(title).toBe('From Space to You');
    });

    it('gets the first N Feeds', async () => {
        const first = await getFirstNRSSFeed(rss_url, 'dsc', 1);
        const last = await getFirstNRSSFeed(rss_url, 'asc', 1);
        console.log(first);
        console.log(last)
    })
});
