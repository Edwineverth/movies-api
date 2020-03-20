const express = require('express');
//const {moviesMock} = require('../utils/moks/movies');
const MoviesService = require('../services/movies');
const {
  movieIdSchema,
  createMovieSchema,
  updateMovieSchema
} = require('../utils/schemas/movies');

const validationHandler = require('../utils/moks/middleware/validationHandler');

const cacheResponse = require('../utils/cacheResponse');
const {
  FIVE_MINUTES_IN_SECONDS,
  SIXTY_MINUTES_IN_SECONDS
} = require('../utils/time');

function moviesApi(app) {
  const router = express.Router();
  app.use('/api/movies', router);
  const moviesService = new MoviesService();
  router.get('/', async (req, res, next) => {
    cacheResponse(res, FIVE_MINUTES_IN_SECONDS);
    try {
      const { tags } = req.query;
      const movies = await moviesService.getMovies({ tags });
      //throw new Error('Error getting movies'); // prueba de middleware
      res.status(200).json({
        data: movies,
        message: 'movies listed'
      });
    } catch (err) {
      next(err);
    }
  });

  router.get(
    '/:movieId',
    validationHandler({ movieId: movieIdSchema }, 'params'),
    async (req, res, next) => {
      const { movieId } = req.params;
      cacheResponse(res, SIXTY_MINUTES_IN_SECONDS);
      try {
        const movies = await moviesService.getMovie(movieId);
        res.status(200).json({
          data: movies,
          message: 'movie retrieved'
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.post(
    '/',
    validationHandler(createMovieSchema),
    async (req, res, next) => {
      const { body: movie } = req;
      try {
        const createMoviesId = await moviesService.createMovie({ movie });
        res.status(201).json({
          data: createMoviesId,
          message: 'movie create'
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.put(
    '/:movieId',
    validationHandler({ movieId: movieIdSchema }, 'params'),
    validationHandler(updateMovieSchema),
    async (req, res, next) => {
      const { movieId } = req.params;
      const { body: movie } = req;
      try {
        const updateMovieId = await moviesService.updateMovie({
          movieId,
          movie
        });
        res.status(200).json({
          data: updateMovieId,
          message: 'movie updated'
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.delete(
    '/:movieId',
    validationHandler({ movieId: movieIdSchema }, 'params'),
    async (req, res, next) => {
      const { movieId } = req.params;
      try {
        const deleteMovieId = await moviesService.deleteMovie({ movieId });
        res.status(200).json({
          data: deleteMovieId,
          message: 'movie deleted'
        });
      } catch (err) {
        next(err);
      }
    }
  );
}

module.exports = moviesApi;
