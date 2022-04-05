const RSSParser = require('rss-parser');
const { getRSSFeed, getRSSFeedFiltered, getRSSFeedFormatted } = require('../rss-parser');
const moment = require('moment');
const { months } = require('moment');
const sinon = require('sinon');
const sandbox = sinon.createSandbox();
const sampleFeed = require('../../../misc/sample-feed.json');
const { expect } = require('chai');
const { is } = require('express/lib/request');

const rss_url = "https://www.nasa.gov/rss/dyn/Houston-We-Have-a-Podcast.rss"
describe('RSS Parser Test', () => {
    beforeEach(() => {
        var stub = sinon.createStubInstance(RSSParser);
        stub.parseURL.returns(sampleFeed);
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('calls the api and returns an XML', async () => {
        const { items } = await getRSSFeed(rss_url);
        const firstItem = items[0];
        const { title, link, pubDate, content, guid, isoDate } = firstItem;
        expect(title).equal('From Space to You');
        expect(link).equal('http://www.nasa.gov/johnson/HWHAP/from-space-to-you');
        expect(pubDate).equal('Fri, 01 Apr 2022 08:30 EDT');
        expect(content).equal('On Episode 238, Daniel Lockney reviews some of the most fascinating NASA technologies that have made their way into our everyday lives.');
        expect(guid).equal('http://www.nasa.gov/johnson/HWHAP/from-space-to-you');
        expect(isoDate).equal('2022-04-01T12:30:00.000Z');
    });

    it('gets the first N Feeds Formatted', async () => {
        const { title, audioUrl, publishedDate } = (await getRSSFeedFormatted(rss_url, 'dsc', 1))[0];
        expect(title).equal('From Space to You');
        expect(audioUrl).equal('http://www.nasa.gov/sites/default/files/atoms/audio/ep238_from_space_to_you.mp3');
        expect(publishedDate).equal('01/04/2022, 11:30:00 pm AEST');
    });

    it('gets the first N Feeds Filtered', async () => {
        const first = (await getRSSFeedFiltered(rss_url, 'dsc', 1))[0];
        const last = (await getRSSFeedFiltered(rss_url, 'asc', 1))[0];
        expect(moment(first.isoDate) > moment(last.isoDate)).equal(true);
    });
});
