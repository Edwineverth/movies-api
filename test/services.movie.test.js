const assert = require('assert'); // nativa de Node

const proxyquire = require('proxyquire'); // Requerir el servicio y remplazar la lib de mongo por los Mokcs

const { MongoLibMock, getAllStub } = require('../utils/moks/mongoLib');

const { moviesMock } = require('../utils/moks/movies'); // La lista general de peliculas

/**
 * Descripcion del test
 */
describe('Services - movies', function() {
  const MoviesServices = proxyquire('../services/movies', {
    '../lib/mongo': MongoLibMock
  }); // Replace library mongo by lib mock
  const moviesService = new MoviesServices(); // By default use library of mongo with mock

  describe('when getMovies method is called', async function() {
    it('Should call the getAll Mongo lib Method', async function() {
      await moviesService.getMovies({});
      assert.strictEqual(getAllStub.called, true);
    });
    // Compare to result of my services is equal Mock, is Use "DeepEcual" for compare Objects of very level's
    it('should return array of movies', async function() {
      const result = await moviesService.getMovies({});
      const expected = moviesMock;
      assert.deepEqual(result, expected);
    });
  });
});
