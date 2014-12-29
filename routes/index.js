/* GET home page. */
exports.index = function(req, res){
  res.render('index', { title: 'Express', alphabets: ['a','b','c','e','f'] });
};
