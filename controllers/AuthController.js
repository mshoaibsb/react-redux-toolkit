const User = require("../models/UserModel");


module.exports = {
    register: async (req, res) => {
        try {
            const { username, email, password, role} = req.body;
            if(!req.body.username || !req.body.email || !req.body.password) throw Error("Unable to create user invalid params");

            if (req.body.role == "admin") throw Error("Can not register as admin");

            const user  = await User.findOne({email: req.body.email});

            if (user) throw Error("User already exist");

            const newUser = new User({
                username,
                email,
                role, 
            });
            newUser.setPassword(password);

            // storing user in database
             const { errors } = await newUser.save()

             if (errors) throw Error('Error while storing User in database')

            sendToken(newUser, 201, res);
            
        } catch (error) {  
            return res.status( error.status || 500 ).json({ 
                message: error.message ? error.message : 'Something went wrong'
            });
        }
    },
    login: async function (req, res) {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({email}).select(["+hash", "+salt"]);

            if(!user) throw Error("User not found, Please register")
            
            const checkPassword = user.validatePassword(password);

            if(!checkPassword) throw Error("Please Enter correct password")

            sendToken(user, 200, res);
            
        } catch (error) {
            return res.status(error.status || 500).json({
                message: error.message ? error.message : 'Something Went Wrong'
            })
        }
    }
    
}

function sendToken(user, statusCode, res) {
    const token = user.generateJWT();
    return res.status(statusCode).json({success:true, token})
}