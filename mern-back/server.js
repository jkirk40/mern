const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const itemRoutes = express.Router();
const PORT = 4000;
const passport = require("passport");

const users = require("./routes/api/users");

let Item = require('./item.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/items', {useNewUrlParser: true});
const connection = mongoose.connection;

connection.once('open', function() {
    console.log('mongodb database connection established successfully');
})

itemRoutes.route('/').get(function(req, res) {
    Item.find(function(err, items) {
        if(err) {
            console.log(err);
        } else {
            res.json(items);
        }
    });
});

itemRoutes.route('/:id').get(function(req, res){
    let id = req.params.id;
    Item.findById(id, function(err, item) {
        res.json(item);
    });
});

itemRoutes.route('/add').post(function(req, res){
    let item = new Item(req.body);
    item.save()
        .then(item => {
            res.status(200).json({'item': 'item added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new item failed');
        });
});

itemRoutes.route('/update/:id').post(function(req, res){
    let id = req.params.id;
    Item.findById(id, function(err, item){
        if(!item)
            res.status(404).send('data not found');
        else
            item.item_description = req.body.item_description;
            item.item_responsible = req.body.item_responsible;
            item.item_priority = req.body.item_priority;
            item.item_complete = req.body.item_complete;

            item.save().then(item => {
                res.json('item updated');
            })
            .catch(err => {
                res.status(400).send('update not possible');
            })
    })
})

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
// Routes
app.use("/api/users", users);

app.use('/items', itemRoutes);

app.listen(PORT, function() {
    console.log('Server running on Port: ' + PORT);
})