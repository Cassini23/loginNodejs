/**
 * Created by nina on 4/24/15.
 */
var router = require('express').Router();

//require both models
var authenticateModel = require('../Models/authenticateModel');
var sessionModel = require('../Models/sessionModel');

/****SESSION ID /UUID*****/

function getUUID(){
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}


router.get('/:email/:password',function(req, res){
    //res.status(200).json({ message: 'IMPL_101' });
    authenticateModel.findOne({email: req.params.email, password: req.params.password},function(err, results){
        if(err) res.status(500).json({err: err});
        res.status(200).json(results);
    });
});

router.post('/',function(req, res){
    //check if id exists in the authenticateModel and then ass it to sessions
    var ip = req.ip;
    var email = req.body.email;
    var cookie = getUUID();
    var timestamp = new Date();
    var expires = new Date(Date.now()+900000);
    var obj = {timeStamp: timestamp,cookie: cookie ,userID: email};

    authenticateModel.findOne({email: req.body.email, password: req.body.password},function(err, results){
        //if(err) res.status(500).json({err: err});
        new sessionModel(obj).save(function(err){
            if(err) res.status(500).json({err : err});
            else{
                res.cookie('cookie-name'+req.body.email,cookie, { expires: expires,maxAge: 900000, httpOnly: false });
                res.status(200).json(results);
            }

        });
    });


    /*

    new authenticateModel(req.body).save(function(err, results){
        if(err) res.status(500).json({err : err});
        res.status(200).json(results);
    });*/
});



router.put('/',function(req, res){
    res.status(200).json({ message: 'IMPL_101' });
});

router.delete('/',function(req, res){
    res.status(200).json({ message: 'IMPL_101' });
});


module.exports = router;