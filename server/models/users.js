const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const {schema}= require('./validation/userValidation')

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		trim: true,
		required: true,
		unique: true,
	},
	name: {
		type: String,
		trim: true,
		required: true,
		minlength: 1,
		maxLength: 35,
	},
	password: {
		type: String,
		trim: true,
		required: true,
		minlength: 5,
		maxLength: 255,
	},
	address :{
		type : String,
		trim : true,
	},
	phoneNumber : {
		type : String,
		trim :true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
    profileImg : {
		type : String,
		default : 'placeholder.png'
	},
    cart : [{
		type : mongoose.Schema.Types.ObjectId,
		ref : 'Product'
	}],
    list : [{
		type : mongoose.Schema.Types.ObjectId,
		ref : 'Product'
	}],
});

//middleWare
userSchema.pre('save',function(next) {
	let user = this
	
	if(!user.isModified('password')) return next()

	bcrypt.hash(user.password,10, (err,hash) => {
		if(err) return next(err);

		user.password = hash

		next()
	})
})

userSchema.statics.userValidation = function (body) {
    return schema.validate(body,{abortEarly: true})
}


module.exports = mongoose.model("User",userSchema) 