var express = require('express');
var path = require('path');
var Nightmare = require('nightmare');
var router = express.Router();
var nightmare = Nightmare({
    'show' : true,
    webPreferences: {
        partition: 'nopersist'
    }
});

router.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname + '/../views/home.html'));
});

router.post('/', function(req, res, next) {

    var username = req.body.username;
    var password = req.body.password;
    var search = req.body.search;
    var comment = req.body.comment;
    var posts = req.body.posts;

    nightmare
        .goto('http://instagram.com')
        .wait('._fcn8k')
        .click('._fcn8k')
        .wait('input[name=username]')
        .insert('input[name=username]', username)
        .insert('input[name=password]', password)
        .click('._ah57t')
        .wait('._9x5sw')
        .insert('._9x5sw', search)
        .wait('._k2vj6')
        .click('._k2vj6')
        .wait('._8mlbc')
        .click('._8mlbc')
        .wait('._ebwb5');

    for (var i = 0; i < posts; i++) {
        nightmare.wait(1000)
            .click('._ebwb5')
            .insert('._7uiwk', comment)
            .type('._7uiwk', '\u000d')
            .click('._de018');
    }

    nightmare
        .wait(1000)
        .end()
        .then(function () {
            res.json({status:'success'});
        })
        .catch(function (error) {
            res.json({status:'success'});
        });
});

module.exports = router;