var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes');
var users = require('./routes/user');
var bizData = require("./data/bizdata");
var Details = require('./models/detailsSchema');

var fs = require('fs');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.bodyParser({
    keepExtensions: true,
    uploadDir: './public/images'    
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

app.get('/', routes.index);
app.get('/users', users.list);


app.post('/postnew', function(req, res) { 
    /*var target_path = "";

    var newData = {};
    newData.name = req.body.name;
    newData.description = req.body.description;
    newData.phone = req.body.phone;
    newData.email = req.body.email;
    newData.address = req.body.address;

    var businessImage = req.files.businessImage;

    if(businessImage.name != "")
    {
        target_path = './public/images/' + businessImage.name;
        var tmp_path = businessImage.path;

        fs.rename(tmp_path, target_path, function(err) {
                if (err) { console.log("error"); }
                fs.unlink(tmp_path, function() {
                    if (err) { console.log("error"); }
                    console.log("uploaded");
                });
        });
    }
   
    newData.image = target_path;
    bizData.data.push(newData);*/

    /* var outputFilename = './data/data.json';

    fs.writeFile(outputFilename, JSON.stringify(bizData.data, null, 4), function(err) {
        if(err) {
          console.log(err);
        } else {
          console.log("JSON saved to " + outputFilename);
        }
    });*/
    
    var details = new Details({
          name:req.body.name,
          description:req.body.description,
          image:req.body.image,
          phone:req.body.phone,
          email:req.body.email,
          address:req.body.address
    });

    details.save();
    res.redirect("addnew", {message:"Business Added"});
});



app.get('/category/:id', function(req, res) {

    var categoryList = [];
    var firstCategory = "";
    var firstCategoryElems = [];

    for(var i=0;i<bizData.data.length;i++)
    {
            var currCategory = String(bizData.data[i].category);
            if(currCategory.substring(0,1) == req.params.id) {
                if(firstCategory == "") {
                    firstCategory = bizData.data[i].category;
                }

                if(currCategory == firstCategory) {
                    firstCategoryElems.push(bizData.data[i]);
                }

                if(categoryList.indexOf(currCategory) == -1)
                    categoryList.push(bizData.data[i].category);
            }
    }
    console.log(categoryList); 
    res.render("categoryView", {categories:categoryList,categoryElems:firstCategoryElems});
});

app.get('/description/:id', function(req, res) {
     var descObj = null;
     for(var i=0;i<bizData.data.length;i++) {
        if(bizData.data[i].id == req.params.id) {
            descObj = bizData.data[i];
            break;
        }
     }
    res.render("descriptionView", {obj:descObj});
});

app.get('/category/elemselect/:businessType', function(req, res) {
    var categoryList = [];
    var firstCategory = req.params.businessType;
    var firstCategoryElems = [];

    var initialChar = firstCategory.substring(0,1);

    for(var i=0;i<bizData.data.length;i++)
    {
            var currCategory = String(bizData.data[i].category);
            if(currCategory.substring(0,1) == initialChar) {
                if(currCategory == firstCategory) {
                    firstCategoryElems.push(bizData.data[i]);
                }

                if(categoryList.indexOf(currCategory) == -1)
                    categoryList.push(bizData.data[i].category);
            }
    }
    console.log(categoryList);
    //res.send('id is '+req.params.id+" cat list "+categoryList +
    // " first cat "+firstCategory+" <br>first cat items "+firstCategoryElems);
    
    res.render("categoryView", {categories:categoryList,categoryElems:firstCategoryElems});
});

app.get('/addnew', function(req, res) { 
    res.render("addnew", {message:""});
});
app.get('/editOps', function(req, res) { 
    res.render("editAll", {allData:bizData.data});
});
app.get('/edit/:id', function(req, res) { 
    var descObj = null;
    for(var i=0;i<bizData.data.length;i++) {
        if(bizData.data[i].id == req.params.id) {
            descObj = bizData.data[i];
            break;
        }
     }
    res.render("editItem", {item:descObj});
});


http.createServer(app).listen(3000, function() {

 console.log("Biz vid app started");
 console.log("Bigggg");
 console.log("Biz vid app started at port number 3000");
});




/// catch 404 and forwarding to error handler
/*app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});*/

/// error handlers

// development error handler
// will print stacktrace
/*if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}*/

// production error handler
// no stacktraces leaked to user
/*app.use(function(err, req, res, next) {
    res.render('error', {
        message: err.message,
        error: {}
    });
});*/

//module.exports = app;
