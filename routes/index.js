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
        .wait('a[href="javascript:;"]')
        .click('a[href="javascript:;"]') // log in option
        .wait('input[name=username]')
        .insert('input[name=username]', username)
        .insert('input[name=password]', password)
        .click('button') // btn login
        .wait('input[placeholder=Search]')
        .insert('input[placeholder=Search]', search)
        .wait('._gimca')
        .click('._gimca') // top suggest
        // .wait(`a[href*=${search}]`)
        .wait(5000)
        .end()
        .wait('._mck9w')
        .click('._mck9w a') // click post
        .wait('._eszkz');

    for (var i = 0; i < posts; i++) {
        nightmare.wait(1000)
            .click('._eszkz') // like
            .insert('._bilrf', comment) // comment
            .type('._bilrf', '\u000d')
            .click('._3a693'); // next
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