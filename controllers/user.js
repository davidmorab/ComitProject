const User = require('../models/users')

const register = async(req, res) =>{
    const {firstName,lastName,email,password} = req.body
    try {
        const user = await User.create({
            firstName, lastName, email, password
        })
        res.status(201).json({user});

    } catch (error) {
        return res.status(401).json('Can not create user')
    }
}

const login = async(req, res)=>{
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(500).json({msg:'Please provide email or password'})
    }

    try {
        const user =  await User.findOne({email}).select('password')

        if(!user){
            return res.status(401).json('No user found with that email')
        }

        const Matchis = await user.comparePasswords(password);

        if(!Matchis){
            return res.status(401).json('Invalid password')
        }

        res.status(200).json({msg:"Logged in"})

    } catch (error) {
        return res.status(401).json(error)
    }

};

const updateUser = async(req, res)=>{

    try {

        const user = await User.findByIdAndUpdate(req.params.id, {$set:req.body}, {new:true})


        return res.status(201).json({user})

    } catch (error) {

        return res.status(401).json({msg:'Can not update this user'})

    }

};

const deleteUser = async (req, res)=>{
    try {
        const user = await User.findByIdAndDelete(req.params.id)

        if(!user){
            res.status(401).json('No user found')
        }

        return res.status(200).json('User deleted')

    } catch (error) {
        return res.status(500).json(error)
    }
};

module.exports = {register, login, updateUser, deleteUser}