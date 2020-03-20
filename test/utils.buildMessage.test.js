const assert = require('assert');

const buildMessage = require('../utils/buildMessage');

describe.only('utils - buildMessage', function() {
  describe('When receives na entity and an action', function() {
    it('Should return respective message', function() {
      const result = buildMessage('movie', 'create');
      const expect = 'movie created';
      assert.strictEqual(result, expect);
    });
  });
  describe('when receives an entity and an action and is a list', function() {
    it('Should return the respective message with the entity in plural', function() {
      const result = buildMessage('movie', 'list');
      const expect = 'movies listed';
      assert.strictEqual(result, expect);
    });
  });
});
