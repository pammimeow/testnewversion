 module.exports = (function detailsSchema () {
 var mongoose = require('../db').mongoose;

  var schema = {
    name: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    phone: {
      type: Number,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    }
  };

  var collectionName = 'details';

  var detailsSchema = mongoose.Schema(schema);
  var Details = mongoose.model(collectionName, detailsSchema);
  return Details;

});