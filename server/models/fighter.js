const mongoose = require('mongoose');

const FighterSchema = new mongoose.Schema({
    username: { type:String, required: true },
    score: {type:Number, required: true },
    imageUrl: {type:String, required: true}
}, {timestamps: true});
const Fighter = mongoose.model('Fighter', FighterSchema);

// Many to One Relationships:
// Many side: _onething: {type: Schema.Types.ObjectId, ref: 'OneThing'},
// One side: _manythings: [{type: Schema.Types.ObjectId, ref: 'ManyThing'}],
