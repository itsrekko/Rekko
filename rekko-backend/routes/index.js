const request = require('request');
const express = require('express');
const API_KEYS = require('../consts/apiKeys');
const API_URLS = require('../consts/apiUrls');

var router = express.Router();
const ListProducts = 'products/list'
const SearchProducts = 'products/search'
const ProductDetails = 'products/details'
const Availability = 'products/check-availability'

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Rekko Backend' });
});

router.get('/get_products', async (req, res, next) => {

  const options = {
    method: 'GET',
    url: `${API_URLS.SEPHORA_RAPID_API}${ListProducts}`,
    qs: {categoryId: 'cat150006', pageSize: '5', currentPage: '1'},
    headers: {
      'x-rapidapi-host': `${API_KEYS.RAPID_API_HOST}`,
      'x-rapidapi-key': `${API_KEYS.RAPID_API_KEYS}`,
      useQueryString: true
    }
  };

  const params = req.query;
  
  console.log(params);
  await request(options, function (error, response, body) {
    if (error){
      next(error);
    };
    res.send(body)
  });
});

router.get('/find_reviews', function(req, rest, next){
  res.send('Getting all the product reviews')
});


module.exports = router;
