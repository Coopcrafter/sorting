var debug = require('debug')('demo')
var Review = require('../models/review.model')
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

function sendJSONresponse(res, status, content){
    res.status(status)
    res.json(content)
}

module.exports.readReviewsAll = function(req, res){
    debug('Getting all reviews')
    console.log('Getting all reviews')
    Review.find().exec().then(function(results){
        sendJSONresponse(res, 200, results)
    }).catch(function(err){
        sendJSONresponse(res, 404, err)
    })
}

module.exports.queryPage = function(req, res){
    res.render("QueryExample", {title: "Query"})
}

module.exports.reviewsReadOne = function(req, res){
    debug('Reading one review')
    console.log('Reading one review')

    if(req.params && req.params.reviewid){

        Review.findById(req.params.reviewid).exec().then(
            function(result){
                sendJSONresponse(res,200,result)
            }
        ).catch(function(err){
            sendJSONresponse(res,404,err)
        })
    }else{
        sendJSONresponse(res, 404, {"message":"Review not found."})
    }
}

module.exports.reviewCreate = function(req, res){
    debug('Create one review', req.body)
    console.log('Create one review', req.body)

    Review.create({
        author:req.body.author,
        rating:req.body.rating,
        reviewText:req.body.reviewText
    }).then(function(dataSaved){
        sendJSONresponse(res, 201, dataSaved)
    }).catch(function(err){
        debug(err)
        sendJSONresponse(res, 404, err)
    })

}

module.exports.reviewUpdateOne = function(req, res){
    debug('Update one review')
    console.log('Update one review')
    if(!req.params.reviewid){
        sendJSONresponse(res, 404, {"message":"Not found...request id required"})
        return
    }

    Review.findById(req.params.reviewid).exec().then(
        function(reviewData){
            reviewData.author = req.body.author;
            reviewData.rating = req.body.rating;
            reviewData.reviewText = req.body.reviewText;
            return reviewData.save()
        }
    ).then(function(data){
        sendJSONresponse(res,200, data)
    }).catch(function(err){
        sendJSONresponse(res, 400, err)
    })
}

module.exports.reviewDeleteOne = function(req, res){
    debug('Delete one review')
    console.log('Delete one review')

    if(!req.params.reviewid){
        sendJSONresponse(res, 404, {"message":"Not found...request id required"})
        return
    }

    Review.findByIdAndRemove(req.params.reviewid).exec().then(
        function(reviewData){
            console.log("Review ID " + req.params.reviewid + " deleted")
            debug(reviewData)
        }
    ).catch(function(err){
        sendJSONresponse(res, 400, err)
    })
}

module.exports.sortReviewsAll = function(req, res) {
    console.log("reached")
    Review.find().exec().then(function(results){
        array = Array()
        array = sort(results)
        sendJSONresponse(res, 200, results)
    }).catch(function(err){
        sendJSONresponse(res, 404, err)
    })
}

function sort(array)
{
    console.log("reached sort")
    data = Array()
    foreach(i in array)
    {
        data[i] = array[i] > array[i+1]
        console.log(data[i])
    }
    console.log("Sorting...")
    return data
}

module.exports.sort = (req, res) => {
    console.log(req.query.column)
    console.log(req.query.sort)
    console.log("Reached module.exports.sort")
    Review.find().then((reviews) => {
        if(req.query.sort === 'ascending')
        {
            //sort employees by column in query
            switch (req.query.column) {
                case column = "author":
                    reviews.sort(function(a, b) {
                        return a.author.localeCompare(b.author)
                    });
                    break;
                case column = "rating":
                    reviews.sort(function(a, b) {
                        return a.rating > b.rating
                    });
                    break;
            }
        }
        if(req.query.sort === 'descending')
        {
            //sort employees by column in query
            switch (req.query.column) {
                case column = "author":
                    reviews.sort(function(a, b) {
                        return b.author.localeCompare(a.author)
                    });
                    break;
                case column = "rating":
                    reviews.sort(function(a, b) {
                        return b.rating < a.rating
                    });
                    break;
            }
        }

        res.json({reviews})
        console.log("Finished Sorting...")
    })
}