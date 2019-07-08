const router = require('express').Router();

const MoviesController = require('./movies.controller');

router.get('/', MoviesController.getAllMovies);
router.get('/:id', MoviesController.getMovieById);
router.post('/', MoviesController.addMovie);
router.put('/:id', MoviesController.updateMovie);
router.delete('/:id', MoviesController.deleteMovie);

module.exports = router;