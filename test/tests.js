/* tests

test charge
- success: returns congrats page / creates token
- error: show specific error (card, cvc, expiration)

test admin login

test to make sure create token is added to the admin page


*/

describe('The appendDiv() function', function () {
    var container = document.getElementById('test');

    // teardown after each test to avoid conflicts
    afterEach(function () {
        container.removeChild(container.lastChild);
    });

    it('can append a div into a container element', function () {
        expect(container.lastChild).to.not.be.ok();
        appendDiv('#test');
        expect(container.lastChild.tagName).to.be.eql('DIV');
    });

    it('returns the div it just appended', function () {
        var div = appendDiv('#test');
        expect(container.lastChild).to.be.eql(div);
    });
});
