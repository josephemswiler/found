let db = require('../models')
let axios = require('axios')
let cheerio = require('cheerio')

module.exports = function (app) {

    app.get('/scrape', function (req, res) {

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
                        .catch(err => res.json(err))
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
        res.render('profile')
    })

    app.get('/index', function (req, res) {
        db.Item.find({})
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


}