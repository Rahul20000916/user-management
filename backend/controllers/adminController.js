const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { response } = require('express');

const ADMIN_EMAIL = 'admin@admin.com';
const ADMIN_PASSWORD = 'admin';

module.exports = {

    doAdminLogin: async (req, res) => {
        const { email, password } = req.body;
        try {
          if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
            const token = jwt.sign({ email: email }, "secret", { expiresIn: "1h" });
            res.json({ status: 'ok', auth: true, admintoken: token, admin: { email: email } });
          } else {
            res.json({ status: 'error', auth: false, message: "Invalid password or user not found" });
          }
        } catch (error) {
          console.log(error);
          res.json({ auth: false, message: "Internal server error" });
        }
    },
    getUsers: async (req, res) => {
      try {
        const users = await User.find({});
        res.json({ users }); 
      } catch (err) {
        console.log('Error while fetching the data:', err);
        res.status(500).json({ message: 'Internal server error' });
      }
    },
    addUser: async (req, res) => {
      try {
          const image = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'
          await User.create({
              name: req.body.name,
              email: req.body.email,
              password: req.body.password,
              image: image,
              blocked:null
          })
          res.json({ status: 'ok' })
      } catch (err) {
          res.json({ status: 'error', error: 'duplicate email failed to signup' })
      }
  },
  editUser:async (req, res) => {
    try{
      const userId = req.body.token;
      const user = await User.findOne({_id:userId})
      if(user){
        res.json({user, status:"sucess"})
      }else{
        res.json({status:'failed'})
      }
    }catch(err){
        console.log('Error while fetching the data', err)
        res.json({ status: 'error'});

    }
  },
  updateUser: async (req, res) => {
    try{
          const userId = req.body.token;
          const user= await User.updateOne(
              {_id : userId},
              { $set: { name: req.body.name,
                        email : req.body.email,
                        dob : req.body.dob,
                        gender: req.body.gender,
                        image: req.body.image } },
              )
              res.json({ status: 'ok'});
      }catch(err){
          console.log('Error while fetching the data', err)
          res.json({ status: 'error'});

      }
  },
  deleteUser: async (req, res) => {
    try {
      const userId = req.headers.authorization.split(' ')[1]; 
      await User.findByIdAndDelete(userId);
      res.json({ message: 'Account deleted successfully.', status: "ok" });
    } catch (err) {
      console.error('Error while deleting the account', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
  blockUser: async (req, res) => {
    try {
      const userId = req.headers.authorization.split(' ')[1]; 
      console.log(userId,"nfoinwifnienfienfioe")        
      const user = await User.findOne({_id:userId});
      if(user.blocked){
        console.log("true")
          await User.updateOne(
          {_id : userId},
          { $set: { blocked: null, } },
          )
      }else{
        console.log("false")
        await User.updateOne(
          {_id : userId},
          { $set: { blocked: true, } },
          )  
      }
      res.json({ message: 'successfull.', status: "ok" });
    } catch (err) {
      console.error('Error while updating the account', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
}


