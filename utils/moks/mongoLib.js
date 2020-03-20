/**
 * Cada vez que crea un stub determina si estos metodos son llamados o no.
 * Super util para comprobar, si cuando el servicio fue ejecutado llamo a los metodos de las respectivas librerias
 */

const sinon = require('sinon');

/**
 * Se trae las peliculas y el filtrado para comprobar si con los tags se filtro
 */
const { moviesMock, filterMovieMocks } = require('./movies');

const getAllStub = sinon.stub();
// Cuando se llame con ciertos argumentos: cuando le llame con movies, resuelva con nuestros mocks
getAllStub.withArgs('movies').resolves(moviesMock);

// Cuando llame con movies y query, (Se debe construir tal y como resive el servicio), resuelva con la version filtrada de las peliculas por Tags o drama
const tagQuery = { tags: { $in: ['Drama'] } };
getAllStub.withArgs('movies', tagQuery).resolves(filterMovieMocks('Drama'));

//Resuelva con la primera pelicula de nuestros mocks, mongo devuelve el ID por lo tanto por eso se establece el ID
const createStub = sinon.stub().resolves(moviesMock[0].id);

class MongoLibMock {
  getAll(collection, query) {
    return getAllStub(collection, query);
  }
  create(collection, data) {
    return createStub(collection, data);
  }
}

module.exports = {
  getAllStub,
  createStub,
  MongoLibMock
};
