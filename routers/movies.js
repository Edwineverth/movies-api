const express = require('express');
const {moviesMock} = require('../utils/moks/movies');

function moviesApi(app){
    const router = express.Router();
    app.use('/api/movies',router);
    router.get('/', async (req,res,next)=>{
        try{
            const movies = await Promise.resolve(moviesMock);
            res.status(200).json({
                data:movies,
                message:'movies listed'
            })
        }catch(err){
            next(err);
        }
    });

    router.get('/:movieId', async (req,res,next)=>{
        try{
            const movies = await Promise.resolve(moviesMock[0]);
            res.status(200).json({
                data:movies,
                message:'movie retrieved'
            })
        }catch(err){
            next(err);
        }
    });

    router.post('/', async (req,res,next)=>{
        try{
            const createMoviesId = await Promise.resolve(moviesMock[0].id);
            res.status(201).json({
                data:createMoviesId,
                message:'movie create'
            })
        }catch(err){
            next(err);
        }
    });

    router.put('/:movieId', async (req,res,next)=>{
        try{
            const updateMovieId = await Promise.resolve(moviesMock[0].id);
            res.status(200).json({
                data:updateMovieId,
                message:'movie updated'
            })
        }catch(err){
            next(err);
        }
    });

    router.delete('/:movieId', async (req,res,next)=>{
        try{
            const deleteMovieId = await Promise.resolve(moviesMock[0].id);
            res.status(200).json({
                data:deleteMovieId,
                message:'movie deleted'
            })
        }catch(err){
            next(err);
        }
    });
}

module.exports = moviesApi;