const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

module.exports = {

    doSignup: async (req, res) => {
        try {
            const image = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'
            await User.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                image: image,
                blocked: null
            })
            res.json({ status: 'ok' })
        } catch (err) {
            res.json({ status: 'error', error: 'duplicate email failed to signup' })
        }
    },
    doLogin: async (req, res) => {
        const { email, password } = req.body;
        try {
            const user = await User.findOne({
                email: email,
                password: password
            });
            if (user && user.blocked != true) {
                const token = jwt.sign({ id: user._id }, "secret", { expiresIn: "1h" });
                res.json({ status: 'ok', auth: true, token: token, user: user });
            } else {
                res.json({ status: 'error', auth: false, message: "Invalid password or user not found" });
            }
        } catch (error) {
            console.log(error);
            res.json({ auth: false, message: "Internal server error" });
        }
    },
    getProfile: async (req, res) => {
        try {
            const token = req.body.token;  
            const secret = 'secret';  
            const decoded = await jwt.verify(token, secret);
            const userId = decoded.id;
            const user = await User.findOne({ _id: userId });
            console.log("oivioviohsiohsiofidsifiosdiofhdsfhdiohfdhf")
            res.json({ user });
        } catch (err) {
            console.log('Error while fetching the data:', err);
            res.status(500).json({ message: 'Internal server error'});
        }
    },
    getEdit: async (req, res) => {
        try{
            const token = req.body.token;
            const secret = 'secret';
            const decoded = await jwt.verify(token, secret);
            const userId = decoded.id;
            const user = await User.findOne({ _id : userId});
            res.json({user})
            console.log(user)
        }catch(err){
            console.log('Error while fetching the data', err);
            res.status(500).json({message:'Internal server error'})
        }
    },
    updateProfile: async (req, res) => {
        try{
            const token = req.body.token;
            const secret = 'secret';
            const decoded = await jwt.verify(token, secret);
            const userId = decoded.id;
            const user= await User.updateOne(
                {_id : userId},
                { $set: { name: req.body.name,
                          email : req.body.email,
                          dob : req.body.dob,
                          gender: req.body.gender,
                          image: req.body.image } },
                )
            if( user){
                res.json({ status: 'ok', auth: true, token: token, user: user });
            }else{
                res.json({ status: 'error', message: 'cant update the values' });
            }    
        }catch(err){
            console.log('Error while fetching the data', err)
            res.json({ status: 'error'});

        }
    },
    removeAccount: async (req, res) => {
        try {
          const token = req.headers.authorization.split(' ')[1];         
          const secret = 'secret';
          const decoded = await jwt.verify(token, secret);
          const userId = decoded.id;
          await User.findByIdAndDelete(userId);
          res.json({ message: 'Account deleted successfully.', status: "ok" });
        } catch (err) {
          console.error('Error while deleting the account', err);
          res.status(500).json({ message: 'Internal server error' });
        }
    },
    
      
}
