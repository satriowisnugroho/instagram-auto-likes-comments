const express = require('express');
const path = require('path');
const Nightmare = require('nightmare');
const router = express.Router();
const nightmare = Nightmare({
    'show' : true,
    webPreferences: {
        partition: 'nopersist'
    },
});

router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/../views/home.html'));
});

router.post('/', function(req, res) {

    const username = req.body.username;
    const password = req.body.password;
    const search = req.body.search;
    const comment = req.body.comment;
    const posts = req.body.posts;

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

    for (let i = 0; i < posts; i++) {
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
        .catch(function () {
            res.json({status:'success'});
        });
});

module.exports = router;