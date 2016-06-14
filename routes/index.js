var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  req.client.search({
    index: 'yoda'
  }, function (error, response) {
    res.render('index', {
      title: 'Yoda Search',
      posts : response['hits']
    });
  });
});

router.post('/search', function(req, res, next) {
  var search = {
    index: 'yoda',
    type: 'posts',
    body: {
      query: {
        bool: {
          should: [
            { match_phrase_prefix: { PostHeader: req.body.search_term } },
            { match_phrase_prefix: { AuthorName: req.body.search_term } },
            { match: { Tags: req.body.search_term } }
          ]
        }
      },
      highlight: {
        fields: {
          PostHeader: {}
        }
      }
    }
  };
  console.log(JSON.stringify(req.body));
  console.log(JSON.stringify(search));
  req.client.search(search).then(function (resp) {
    res.render('index', {
      title: 'Yoda Search',
      posts : resp['hits']
    });
  }, function (err) {
    console.trace(err.message);
  });
  // req.client.search({
  //   index: 'yoda',
  //   body: {
  //     query: {
  //       match: {
  //         PostHeader: req.body.search_term
  //       }
  //     }
  //   }
  // }, function (error, response) {
  //   res.render('index', {
  //     title: 'Express',
  //     posts : response['hits']
  //   });
  // });
});

module.exports = router;
