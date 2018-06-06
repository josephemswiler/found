let db = require('../models')
let axios = require('axios')
let cheerio = require('cheerio')

module.exports = function (app) {

    app.get('/scrape', function (req, res) {

        axios.get('http://needsupply.com/womens/shoes?p=2').then(function (response) {

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

                db.Item.create(item)
                    .then(function (dbItem) {
                        items.push(dbItem)
                    })
                    .catch(err => res.json(err))
            })
            res.json(items)
        })
    })
    // /scrape

    //Load main page

    app.get('/', function (req, res) {
        res.render('profile')
    })

    app.get('/index', function (req, res) {
        res.render('index')
    })

    app.get('/about', function (req, res) {
        res.render('about')
    })

    
}