var express = require('express');
var router = express.Router();
var ctrlReviews = require('./controllers/review.controller')

//include routes for REST API Example
router.get('/reviews', ctrlReviews.readReviewsAll)
router.get('/reviews/:reviewid', ctrlReviews.reviewsReadOne)
router.post('/reviews', ctrlReviews.reviewCreate)
router.put('/reviews/:reviewid', ctrlReviews.reviewUpdateOne)
router.delete('/reviews/:reviewid', ctrlReviews.reviewDeleteOne)
//router.get('/reviews?:column=:value', ctrlReviews.sort)
router.get('/reviews?:column=:value', (req, res) => {
  console.log(req.params.body)
    Review.find().then((reviews) => {
        if(req.params.sort === 'ascending')
        {
            //sort employees by column in query
            switch (req.params.column) {
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
        res.json({reviews})
        debug.log("Finished Sorting...")
    })
})

router.get('/QueryExample', ctrlReviews.queryPage)

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
