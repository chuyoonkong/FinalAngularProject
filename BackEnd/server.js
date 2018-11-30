var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var mongoDB = 'mongodb://admin123:admin123@ds115874.mlab.com:15874/project';  //path to your mongodb account
mongoose.connect(mongoDB); //connect to your moongoose account

var Schema = mongoose.Schema;
var postSchema = new Schema({
    movieTitle: String,
    movieGenre: String,
    movieDirector: String,
    movieProducer: String
})
var PostModel = mongoose.model('post', postSchema);

//Configuring express to use body parser as middle ware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post('/api/posts', function(req,res){
    console.log("Post Successful");
    console.log(req.body.movieTitle);
    console.log(req.body.movieGenre);
    console.log(req.body.movieDirector);
    console.log(req.body.movieProducer);

    PostModel.create({
        movieTitle: req.body.movieTitle,
        movieGenre: req.body.movieGenre,
        movieDirector: req.body.movieDirector,
        movieProducer: req.body.movieProducer
    });
    
    res.send('Movie Added!');
})

app.get('/api/posts', function(req, res){
    PostModel.find(function(err,data){
        res.json(data);
    });
})

app.get('/api/posts/:id', function(req, res){
    console.log("Read post " + req.params.id);

    PostModel.findById(req.params.id,
        function(err, data){
            res.json(data);
        });
})

//Find specific post and update it 
app.put('/api/posts/:id', function(req,res){
    console.log("Update Post" + req.params.id);
    console.log(req.body.movieTitle);
    console.log(req.body.movieGenre);
    console.log(req.body.movieDirector);
    console.log(req.body.movieProducer);

    PostModel.findByIdAndUpdate(req.params.id, req.body,
        function(err, data){
            res.send(data);
        })
})

//Find specific post and delete it
app.delete('/api/posts/:id', function(req, res){
    console.log(req.params.id);

    PostModel.deleteOne({_id:req.params.id},
        function(err,data)
        {
            if(err)
                res.send(err);
            res.send(data);
        })
})

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    
    console.log("Your app listening at http://%s:%s", host, port)
 })