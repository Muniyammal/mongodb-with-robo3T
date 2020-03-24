const User = require('../models/user');
const Car = require('../models/car');
const router = require('express').Router();
router.post('/register',async(req,res)=>{
    const {error}=register(req.body,schema);
    if(error) return res.send(error.details[0].message);


    const user = newUser({
        name :req.body.name,
        password :req.body.password
    });
  try{
      const savedUser = await user.save();
      res.send(savedUser);
  }catch(err){
      res.send(err);
  }
}); 

module.exports ={
    index:  async(req,res,next)=> {
        const users = await User.find({});
       res.json(users);
     },
        newUser: async(req,res,next)=>{
            const newUser = new User(req.body);
            const user =await newUser.save();
            res.json(user);
    },

    getUser : async(req,res,next)=>{
        const { userId } =req.params;

     const user = await User.findById(userId);
     res.json(user);
    },

    replaceUser : async (req,res,next) => {
        //req.body must contain all the fields...
        const { userId } =req.params;
        const newUser = req.body ;
        const result = await User.findByIdAndUpdate(userId,newUser);
        res.json('success');
    },
    updateUser :async (req,res,next) => {
        //req.body may contain any number of fields...
        const { userId } =req.params;
        const newUser = req.body ;
        const result = await User.delete(userId,newUser);
        res.json('update successfully ');
    },
    deleteUser :async (req,res,next) => {
        const { userId } =req.params;
        const newUser = req.body ;
        const result = await User.findByIdAndUpdate(userId,newUser);
        res.json('deleted successfully ');
    },

    getUserCars : async (req,res,next) => {
        const { userId } =req.params;
        const user = await User.findById(userId).populate('cars');
        console.log('user' ,user);
        res.json(user.cars);
    },
    newUserCar : async (req,res,next) => {
     const { userId } =req.params;
     //create a new car
     const newCar = new Car(req.body);
  
  //get user...
  const user= await  User.findById(userId);
  //create a new car
 newCar.seller = user;
 //save the car 
await newCar.save();   
//add a car to user's selling array cars
user.cars.push(newCar);
//save the user
await user.save();
res.json(newCar);
}

        
};
