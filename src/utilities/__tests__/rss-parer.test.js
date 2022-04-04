const { getRSSFeed, getRSSFeedFiltered, getRSSFeedFormatted } = require('../rss-parser');
const moment = require('moment');
const { months } = require('moment');

// we would be using a mock - like here - https://pawelgrzybek.com/mocking-functions-and-modules-with-jest/#function-mock-using-jestfn
// to mock the return value, if it were not a test.
const rss_url = "https://www.nasa.gov/rss/dyn/Houston-We-Have-a-Podcast.rss"
describe('RSS Parser Test', () => {
    it('calls the api and returns an XML', async () => {
        const { items } = await getRSSFeed(rss_url);
        const firstItem = items[0];
        const { title, link, pubDate, content, guid, isoDate } = firstItem;
        expect(title).not.toBeNull()
    });

    it('gets the first N Feeds Formatted', async () => {
        const { title, audioUrl, publishedDate } = (await getRSSFeedFormatted(rss_url, 'dsc', 1))[0];
        expect(title).not.toBeNull();
        expect(audioUrl).not.toBeNull();
        expect(publishedDate).not.toBeNull();
    });

    it('gets the first N Feeds Filtered', async () => {
        const first = (await getRSSFeedFiltered(rss_url, 'dsc', 1))[0];
        const last = (await getRSSFeedFiltered(rss_url, 'asc', 1))[0];
        expect(moment(first.isoDate) > moment(last.isoDate)).toBeTruthy();
    });
});
