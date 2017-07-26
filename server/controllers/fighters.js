const mongoose = require('mongoose');
const Fighter = mongoose.model('Fighter');

module.exports = {
  getAll: (req, res, next)=>{
    console.log("I'm in the Fighter controller getAll function")
    Fighter
      .find()
      .then((fighters)=>{
        res.json(fighters); 
      })
      .catch((err)=>{
        res.status(501).json(err);
      })
  },
  getThis: (req, res, next)=>{
    console.log("I'm in the Fighter controller getThis function")
    Fighter
      .findById(req.params.id)
      .then((fighter)=>{
        res.json(fighter);
      })
      .catch((err)=>{
        res.status(502).json(err);
      })
  },
  addThis:(req, res, next)=>{
    console.log('POST DATA in Fighter addThis function:', req.body);
    Fighter.findOne({username: req.body.username.toLowerCase()})
      .catch((err)=>console.log(err))
      .then((user)=>{
        console.log('findOne succeeded; found:', user);
        if (!user){
          new Fighter({username: req.body.username.toLowerCase(), score: req.body.score, imageUrl: req.body.imageUrl})
          .save()
          .then(()=>{res.json(true);})
          .catch((err)=>{res.status(503).json(err);});
        }
      })
  },
  deleteThis: (req, res, next)=>{
    // console.log('POST DATA in Fighter deleteThis function:', req.body);
    Fighter
      .findByIdAndRemove(req.params.id, (err)=>{
        res.status(504).json(err);
      })
  },
  updateThis: (req, res, next)=>{
    Fighter
      .findByIdAndUpdate(
        req.params.id,
        {$set: {
          name: req.body.name
        }}
      )
      .then((fighter)=>{  
        res.json(true)
      })
      .catch((err)=>{res.status(503).json(err);});
  },
}

// Many to One Relationships: grab and then populate!
// OneThing.find().sort('createdAt').populate('_manythings').sort(-createdAt')
