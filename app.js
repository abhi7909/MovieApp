const express = require('express');
const path = require('path');
const request = require('request');
const app = express();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/results', (req, res)=> {
let query = req.query.search;

    request('https://api.themoviedb.org/3/search/movie?api_key=1d63a9e51fa145fd1f985f8a6f61e090&query='+query, (error, response, body) => {
        if(error) {
            console.log(error);
        }

        let data = JSON.parse(body);
        res.render('movies', {data:data, searchQuery:query});

    });

});

app.get('/search', (req,res)=> {
    res.render('search');
});

app.listen(3000, ()=>{
    console.log('Server started at port 3000.');
});