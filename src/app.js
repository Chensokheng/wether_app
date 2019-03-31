const express = require("express");
const path = require("path");
const app = express();
const hbs = require('hbs');
const geocode = require('./utils/geocode.js');
const forecast = require("./utils/forecast.js")
const port = process.env.PORT || 3000;

// define path for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const templateDir = path.join(__dirname, '../templates/views');
const partialDir = path.join(__dirname, '../templates/partials');


//Setup handlebars engine and views location
app.use(express.static(publicDirectoryPath));
app.set('view engine', 'hbs');
app.set('views', templateDir);
hbs.registerPartials(partialDir);




/* This is default route */
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Sokheng'
    });
})


/* This is about page route */
app.get('/about', (req, res) => {
    res.render("about", {
        title: 'Sokheng',
        name: 'Sokheng'
    })
})


// Help route
app.get("/help", (req, res) => {
    res.render('help', {
        help_msg: 'This is helping meassge',
        name: 'Sokheng'
    });
})

// contact route
app.get("/contact", (req, res) => {
    res.render("contact");
});



app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide the address.'
        })
    } else {
        geocode(req.query.address, (error, { latitude, longtitude, location } = {}) => {
            if (error) {
                return res.send({
                    error
                })
            }
            forecast(latitude, longtitude, (error, forecast) => {
                if (error) {
                    return res.send({
                        error
                    })
                }
                res.send([{
                    location,
                    forecast,
                    address: req.query.address
                }]);
            });
        });
    }
});





app.get('/product', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        product: [],
    })
});



// 404 page not found
app.get("/help/*", (req, res) => {
    res.render('404', {
        msg: 'Help article not Found',
        name: 'sokheng'
    })
})


// 404 page not found
app.get("*", (req, res) => {
    res.render("404", {
        msg: 'Page Not Found 404',
        name: 'sokheng'
    })
})

// chang the port when push to heroku
app.listen(port, () => {
    console.log(`Server is now running on port ${port}`);
})