const expect = require('chai').expect;
const splitMessage = require('../models/postmessage.js').splitMessage;
const processMessage = require('../models/postmessage.js').processMessage;
 
describe('postmessage', function () {
    describe('#splitMessage()', function () {
        it('should split message longer than 50 characters into chunks', function () {
            let result = splitMessage("I can't believe Tweeter now supports chunking my messages, so I don't have to do it myself.");
            expect(result).to.include("1/2 I can't believe Tweeter now supports chunking", "2/2 my messages, so I don't have to do it myself.");
        });
    });
    describe('#processMessage()', function () {
        it('should return true for message less than or equal 50 characters', function () {
            let response = processMessage({Tweet:"Short message is okay.", Name:"John"});
            expect(response).to.be.true;
        });
        it('should return false for long span of non-whitespace characters', function () {
            let response = processMessage({Tweet:"Long span 1234567890123456789012345678901234567890123456789012345", Name:"John"});
            expect(response).to.be.false;
        });
    });
});