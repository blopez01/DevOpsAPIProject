//test file
var chai = require("chai");
var assert = chai.assert;
var expect = chai.expect;
var should = chai.should;
var property = require("../routes/propertyservice");

describe('validAddress()', function() {
    it('test short address', function() {
        var address = property.validAddress("");
        expect(address).to.be.false;
    })
    it('test long address', function() {
        var address = property.validAddress("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed porta justo, at ornare nisi. Fusce non eleifend ipsum. Duis ultrices, nunc et hendrerit viverra, eros lacus ornare magna, ut sagittis leo eros id nisl. Nam ullamcorper quam vel nulla condimentum, at molestie enim tincidunt. Donec aliquam sem eget magna laoreet, ac euismod risus volutpat. Cras vulputate mi nec ligula accumsan, quis sollicitudin metus tincidunt. Donec rutrum sit amet mi id vestibulum. Cras accumsan sem non elementum aliquam. Etiam facilisis ullamcorper felis, at ultrices velit. Integer at diam in ligula mollis dapibus vel congue tortor. Quisque finibus sapien vel sapien finibus, cursus vestibulum arcu vehicula. Nam placerat est et quam hendrerit, ac ultricies lectus iaculis Quisque tempor est in mauris aliquam ultrices. Ut feugiat vulputate nisl vitae ullamcorper. Suspendisse sed leo ultricies felis ullamcorper dapibus id ac quam. Donec eleifend purus sit amet diam sodales sodales. Morbi congue ultrices dui, nec facilisis leo.asdjvchbasjdhvasjkdhvbasdfv");
        expect(address).to.be.false;
    })
})
describe('validCity()', function() {
    it('test short city', function() {
        var city = property.validCity("");
        expect(city).to.be.false;
    })
    it('test long city', function() {
        var city = property.validCity("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed porta justo, at ornare nisi. Fusce non eleifend ipsum. Duis ultrices, nunc et hendrerit viverra, eros lacus ornare magna, ut sagittis leo eros id nisl. Nam ullamcorper quam vel nulla condimentum, at molestie enim tincidunt. Donec aliquam sem eget magna laoreet, ac euismod risus volutpat. Cras vulputate mi nec ligula accumsan, quis sollicitudin metus tincidunt. Donec rutrum sit amet mi id vestibulum. Cras accumsan sem non elementum aliquam. Etiam facilisis ullamcorper felis, at ultrices velit. Integer at diam in ligula mollis dapibus vel congue tortor. Quisque finibus sapien vel sapien finibus, cursus vestibulum arcu vehicula. Nam placerat est et quam hendrerit, ac ultricies lectus iaculis Quisque tempor est in mauris aliquam ultrices. Ut feugiat vulputate nisl vitae ullamcorper. Suspendisse sed leo ultricies felis ullamcorper dapibus id ac quam. Donec eleifend purus sit amet diam sodales sodales. Morbi congue ultrices dui, nec facilisis leo.asdjvchbasjdhvasjkdhvbasdfv");
        expect(city).to.be.false;
    })
})
describe('validState()', function() {
    it('test short state', function() {
        var state = property.validState("");
        expect(state).to.be.false;
    })
    it('test long state', function() {
        var state = property.validState("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed porta justo, at ornare nisi. Fusce non eleifend ipsum. Duis ultrices, nunc et hendrerit viverra, eros lacus ornare magna, ut sagittis leo eros id nisl. Nam ullamcorper quam vel nulla condimentum, at molestie enim tincidunt. Donec aliquam sem eget magna laoreet, ac euismod risus volutpat. Cras vulputate mi nec ligula accumsan, quis sollicitudin metus tincidunt. Donec rutrum sit amet mi id vestibulum. Cras accumsan sem non elementum aliquam. Etiam facilisis ullamcorper felis, at ultrices velit. Integer at diam in ligula mollis dapibus vel congue tortor. Quisque finibus sapien vel sapien finibus, cursus vestibulum arcu vehicula. Nam placerat est et quam hendrerit, ac ultricies lectus iaculis Quisque tempor est in mauris aliquam ultrices. Ut feugiat vulputate nisl vitae ullamcorper. Suspendisse sed leo ultricies felis ullamcorper dapibus id ac quam. Donec eleifend purus sit amet diam sodales sodales. Morbi congue ultrices dui, nec facilisis leo.asdjvchbasjdhvasjkdhvbasdfv");
        expect(state).to.be.false;
    })
    it('test valid state', function() {
        var state = property.validState("TX");
        expect(state).to.be.true;
    })
})
describe('validZip()', function() {
    it('test short zip', function() {
        var zip = property.validZip("");
        expect(zip).to.be.false;
    })
    it('test long zip', function() {
        var zip = property.validZip("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed porta justo, at ornare nisi. Fusce non eleifend ipsum. Duis ultrices, nunc et hendrerit viverra, eros lacus ornare magna, ut sagittis leo eros id nisl. Nam ullamcorper quam vel nulla condimentum, at molestie enim tincidunt. Donec aliquam sem eget magna laoreet, ac euismod risus volutpat. Cras vulputate mi nec ligula accumsan, quis sollicitudin metus tincidunt. Donec rutrum sit amet mi id vestibulum. Cras accumsan sem non elementum aliquam. Etiam facilisis ullamcorper felis, at ultrices velit. Integer at diam in ligula mollis dapibus vel congue tortor. Quisque finibus sapien vel sapien finibus, cursus vestibulum arcu vehicula. Nam placerat est et quam hendrerit, ac ultricies lectus iaculis Quisque tempor est in mauris aliquam ultrices. Ut feugiat vulputate nisl vitae ullamcorper. Suspendisse sed leo ultricies felis ullamcorper dapibus id ac quam. Donec eleifend purus sit amet diam sodales sodales. Morbi congue ultrices dui, nec facilisis leo.asdjvchbasjdhvasjkdhvbasdfv");
        expect(zip).to.be.false;
    })
})
describe('validAPIKey()', function() {
    it('test incorrect API key', function() {
        var key = property.validAPIKey("WrongKey");
        expect(key).to.be.false;
    })
})