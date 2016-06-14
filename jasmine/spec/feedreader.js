/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /*
         * Loop through the name and url of each feed and check
         * whether undefined or empty. 
         */
        it('are defined', function () {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).toBeGreaterThan(0);
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).toBeGreaterThan(0);
            }
        });
    });

    describe('The menu', function () {
        /*
         * The body should have menu-hidden set by default
         */
        it('are hidden by default', function () {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        /*
         * Trigger the clicks twice to test the result of both 
         * hidden and shown states.
         */
        it('should toggle the menu', function () {
            var closedState = 'matrix(1, 0, 0, 1, -192, 0)';
            var openedState = 'matrix(1, 0, 0, 1, 0, 0)';
            var menuIcon = $('.menu-icon-link');

            function getNextState() {
                return $('.slide-menu').css('transform') == closedState ? openedState : closedState;
            }

            var nextState = getNextState();
            menuIcon.trigger('click');
            expect($('.slide-menu').css('transform')).toEqual(nextState);

            nextState = getNextState();
            menuIcon.trigger('click');
            expect($('.slide-menu').css('transform')).toEqual(nextState);
        });
    });

    describe('Initial Entries', function () {
        /*
         * Load the feed first
         */
        beforeEach(function (done) {
            loadFeed(0, done);
        });

        /*
         * There is at least 1 entry in the feed when loadFeed is called
         * Commenting out container.append(entryTemplate(entry)); in app.js will cause this to fail.
         */
        it('should have entries in the feed container', function () {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });

    describe('New Feed Selection', function () {
        var firstFeed = null;
        var secondFeed = null;

        /*
         * Save the results of the first and second feeds after 
         * they are loaded
         */
        beforeEach(function (done) {
            loadFeed(0, function () {
                firstFeed = $('.feed').html();
                loadFeed(1, function () {
                    secondFeed = $('.feed').html();
                    done();
                });
            });
        });

        /*
         * Compare the results of the first and second feeds and ensure
         * that they are different.
         */
        it('changes the content when a new feed is loaded', function () {
            expect(firstFeed).not.toBe(null);
            expect(secondFeed).not.toBe(null);
            expect(firstFeed).not.toBe(secondFeed);
        });

        /*
         * Set the feed back to default
         */
        afterEach(function () {
            loadFeed(0);
        })
    });
}());
