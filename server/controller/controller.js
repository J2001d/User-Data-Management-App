var userdb = require('../model/model');

// creating API
// create and save new user 
exports.create = (req,res) =>{
    // validating a request

    if(!req.body){
        res.status(400).send({message:"Content cannot be empty"});
        return;
    }

    // new user getting data from req.body.[whatever you want as per your defined schema]
    const user = new userdb ({
        name : req.body.name,
        email : req.body.email,
        gender: req.body.gender,
        status: req.body.status
    })

    console.log(user);
    // saving user in database

    user
        .save(user)
        .then(data=>{
            // res.send(data)
            res.redirect('/add-user')
        })
        .catch(err=>{
            res.status(500).send({
                message: err || "Some error occured while creating a user"
            });
        });

}

// retrive and return all users
exports.find = (req,res) =>{
    // if particular data is there
    if(req.query.id){
        const id = req.query.id;

        userdb.findById(id)
        .then(data =>{
            if(!data){
                res.status(404).send({message: "Not found user with id " + id})
            }else{
                res.send(data);
            }
        })
        .catch(err=>{
            res.status(500).send({message: err || "Error occured while retriving information"})
        })
    }else{
        userdb.find()
        .then(user =>{
            res.send(user);
        })
        .catch(err=>{
            res.status(500).send({message: err || "Error occured while retriving information"})
        })
    }
}


// Update a new identified user by user id

exports.update = (req,res) =>{
    if(!req.body){
        return res
            .status(400)
            .send({message:"data to update cannot be empty"})

    }
    
    // getting the id so that we can update the database
    const id  = req.params.id;

    userdb.findByIdAndUpdate(id, req.body,{useFindAndModify:false})
    .then(data =>{
        if(!data){
            res.status(404).send({message: "cannot update user" + id + "may be user not found"})
        }else{
            res.send(data);
        }
    })
    .catch(err =>{
        res.status(500).send({message:"Error Update user information"})
    })

}

// delete a user with specified user id 
exports.delete = (req,res) =>{

    const id = req.params.id;

    userdb.findByIdAndDelete(id)
    .then(data =>{
        if(!data){
            res.status(404).send({message:"Cannot delete with" + id + "may be id is wrong"})
        }else{
            res.send({
                message: "User was deleted successfully"
            })
        }
    })
    .catch(err =>{
        res.status(500).send({
            message: "Cound not delete user with id = " + id 
        });
    });
}