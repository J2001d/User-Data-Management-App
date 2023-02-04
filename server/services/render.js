// yai hum wala bhi likh skte the but to make things easy and more clear yaha likh dia aur export krr dia

const axios = require('axios');

exports.homeRoutes = (req,res) =>{
    // make a get request to database

    axios.get('http://localhost:3000/api/users')
    .then(function(response){
        res.render('index' , {users : response.data});

    })
    .catch(err=>{
        res.send(err);
    })

    // changing here 
    // yaha hum api ki madad se database se data lake use display krvayege user ko
    // whatever data we will give to users it can we extracted in index.ejs using users variable
    // res.render('index' , {users : "New Data"});
}

exports.add_user = (req,res) =>{
    // res.send('User Management APP');
    // I need to send add_user.ejs file so I will do the following
    res.render('add_user');
}

exports.update_user = (req,res) =>{
    // res.send('User Management APP');
    // I need to send add_user.ejs file so I will do the following

    axios.get('http://localhost:3000/api/users', { params : { id : req.query.id }})
        .then(function(userdata){
            res.render("update_user", { user : userdata.data})
        })
        .catch(err =>{
            res.send(err);
        })
    // res.render('update_user');
}
    