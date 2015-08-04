// Contractor database layer

var path = require('path');

var Datastore = require('nedb');

// Database layer
var Database = function(path) {
    this.store = new Datastore({
        filename: path,
        autoload: true
    });
};

// Adds a new contractor, starting with a zero rating
Database.prototype.addContractor = function(name) {
    console.log('Adding contractor %s', name);
    this.store.insert({
        name: name,
        rating: 0,
        numberOfRatings: 0
    });
};

// Add a new rating for a contractor
// Overall calculated using a cumulative moving average
Database.prototype.rateContractor = function(name, rating) {
    this.store.findOne({name: name}, function(err, contractor) {
        if (err) {
            console.error('Could not find contractor');
            return;
        }
        var oldRating = contractor.rating;
        var numberOfRatings = contractor.numberOfRatings;
        var newRating = oldRating + (rating - oldRating) /
                        (numberOfRatings + 1);
        console.log('New rating for', name, 'is', newRating);

        this.store.update({
            _id: contractor._id
        }, {
            name:name, 
            rating: newRating,
            numberOfRatings: numberOfRatings + 1
        });
    }.bind(this));
};

module.exports = Database;

