var data = require('./source_data.json');
var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace'
});

for (var key in data['Posts']) {
    client.create({
        index: 'yoda',
        type: 'posts',
        id: data['Posts'][key]['PostId'],
        body: data['Posts'][key]
    }, function (error, response) {
        // ...
    });
}