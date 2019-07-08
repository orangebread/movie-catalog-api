const json = require('jsonfile');
const file = '../api/db.json';

exports.getAllMovies = async (req, res) => {
    try {
        const movies = await json.readFile(file);

        res.json({ success: true, movies });
    } catch (error) {
        res.json({ success: false, message: error, result: 'Could not find movies' });
    }
}

exports.getMovieById = async (req, res) => {
    try {
        const { id } = req.params;
        const movies = await json.readFile(file);

        movies.forEach(movie => {
            if (movie.id == id) {
                res.json({ success: true, movie });
            } 
        });
    } catch (error) {
        res.json({ success: false, message: error, result: 'Could not find movie' });
    }
}

exports.addMovie = async (req, res) => {
    try {
        const movies = await json.readFile(file);
        const id = movies[movies.length-1].id + 1;
        const { title, tagline, description, release_date, actors } = req.body;

        const payload = {
            title,
            tagline,
            description,
            release_date,
            actors,
            id
        }

        movies.push(payload);
        const result = json.writeFile(file, movies);
        if (result) {
            res.json({ success: true, result, message: 'Successfully added movie' });    
        }
    } catch (error) {
        console.log('err', error);
        res.json({ success: false, message: 'Error adding movie'});
    }  
    
}

exports.deleteMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const movies = await json.readFile(file);

        const newMovies = movies.filter(movie => movie.id != id);
        const result = json.writeFile(file, newMovies);
        if (result) {
            res.json({ success: true, message: 'Successfully deleted movie' });    
        }
    } catch (error) {
        res.json({ success: false, message: error, result: 'Could not find movie' });
    }
}

exports.updateMovie = async (req, res) => {
    try {
        const movies = await json.readFile(file);
        const { id } = req.params;
        const { title, tagline, description, release_date, actors } = req.body;
        
        const updatedMovies = movies.map(movie => {
            if(movie.id == id) {
                movie.title = title;
                movie.tagline = tagline;
                movie.description = description;
                movie.release_date = release_date;
                movie.actors = actors;
            }
            return movie;
        });
       

        const result = json.writeFile(file, updatedMovies);

        if (result) {
            res.json({ success: true, result, message: 'Successfully updated movie' });    
        }
    } catch (error) {
        console.log('err', error);
        res.json({ success: false, message: 'Error updating movie'});
    }
}
