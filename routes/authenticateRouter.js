/**
 * Created by nina on 4/24/15.
 */
var router = require('express').Router();

//require both models
var authenticateModel = require('../Models/authenticateModel');
var sessionModel = require('../Models/sessionModel');

router.get('/:email/:password',function(req, res){
    //res.status(200).json({ message: 'IMPL_101' });
    authenticateModel.findOne({email: req.params.email, password: req.params.password},function(err, results){
        if(err) res.status(500).json({err: err});
        res.status(200).json(results);
    })
});

router.post('/',function(req, res){
    //res.status(200).json({ message: 'IMPL_101' });
    new authenticateModel(req.body).save(function(err, results){
        if(err) res.status(500).json({err : err});
        res.status(200).json(results);
    });
});

router.put('/',function(req, res){
    res.status(200).json({ message: 'IMPL_101' });
});

router.delete('/',function(req, res){
    res.status(200).json({ message: 'IMPL_101' });
});


module.exports = router;