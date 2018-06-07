let db = require('../models')
let axios = require('axios')
let cheerio = require('cheerio')

module.exports = function (app) {

    app.get('/search/shoes', function (req, res) {

        axios.get('http://needsupply.com/womens/shoes?p=1').then(function (response) {

            let $ = cheerio.load(response.data)

            let items = []

            $('article').each(function (i, element) {
                let item = {}
                item.name = $(this).attr('data-name')
                item.brand = $(this).attr('data-brand')
                item.price = $(this).attr('data-price')
                item.url = $(this)
                    .find('a')
                    .attr('href')
                item.img = $(this)
                    .find('img')
                    .attr('src')
                item.altImg = $(this)
                    .find('.alternate-image')
                    .attr('data-src')

                axios.get(item.url).then(function (response) {

                    let $ = cheerio.load(response.data)

                    item.description = $('.description').text().trim()

                    db.Item.create(item)
                        .then(function (dbItem) {})
                })
            })
        })
        db.Item.find({})
            .then(function (items) {
                res.json(items)
            })
            .catch(err => res.json(err))
    })

    app.get('/search/bags', function (req, res) {

        axios.get('http://needsupply.com/womens/bags?p=1').then(function (response) {

            let $ = cheerio.load(response.data)

            let items = []

            $('article').each(function (i, element) {
                let item = {}
                item.name = $(this).attr('data-name')
                item.brand = $(this).attr('data-brand')
                item.price = $(this).attr('data-price')
                item.url = $(this)
                    .find('a')
                    .attr('href')
                item.img = $(this)
                    .find('img')
                    .attr('src')
                item.altImg = $(this)
                    .find('.alternate-image')
                    .attr('data-src')

                axios.get(item.url).then(function (response) {

                    let $ = cheerio.load(response.data)

                    item.description = $('.description').text().trim()

                    db.Item.create(item)
                        .then(function (dbItem) {})
                })
            })
        })
        db.Item.find({})
            .then(function (items) {
                res.json(items)
            })
            .catch(err => res.json(err))
    })

    app.get('/', function (req, res) {
        db.Item.find({
                favorite: true
            })
            .populate("Talk")
            .then(function (items) {
                console.log(items)
                res.render('profile', {
                    items: items
                })
            })
            .catch(err => res.json(err))
    })

    app.get('/profile', function (req, res) {
        db.Item.find({
                favorite: true
            })
            .populate("Talk")
            .then(function (items) {
                console.log(items)
                res.render('profile', {
                    items: items
                })
            })
            .catch(err => res.json(err))
    })

    app.get('/index', function (req, res) {
        db.Item.find({}).sort({
                dateCreated: -1
            })
            .populate("Talk")
            .then(function (items) {
                console.log(items)
                res.render('index', {
                    items: items
                })
            })
            .catch(err => res.json(err))
    })

    app.get('/about', function (req, res) {
        res.render('about')
    })

    app.post('/api/talk', (req, res) => {
        db.Talk.create({
            date: req.body.date,
            text: req.body.text
        }).then(data => res.json(data))
    })

    app.post("/api/talk/:id", function (req, res) {
        db.Talk.create(req.body)
            .then(dbTalk => db.Item.findOneAndUpdate({
                _id: req.params.id
            }, {
                note: dbTalk._id
            }, {
                new: true
            }))
            .then(data => res.json(data))
            .catch(err => res.json(err))
    })

    app.put("/api/item/:id", function (req, res) {
        db.Item.findOneAndUpdate({
                _id: req.params.id
            }, {
                favorite: req.body.favorite
            }, {
                new: false
            })
            .then(data => res.json(data))
            .catch(err => res.json(err))
    })

    app.delete("/api/item/:id", (req, res) => {
        db.Item.findOneAndDelete({
            _id: req.params.id
        }).then(data => res.json(data))
    })
}