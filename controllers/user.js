const User = require('../models/users')
const cookieParser = require('cookie-parser');

const register = async(req, res) =>{
    const {firstName,lastName,email,password} = req.body
    if (!firstName || !lastName || !password || !email) {return res.status(401).json({msg: "Please provide the credentials"})};
    try {
        const user = await User.create({
            firstName, lastName, email, password
        })
        const token = user.createJWT();
        res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
        return res.status(201).json({user,token})
        res.redirect('/index')


    } catch (error) {
        return res.status(401).json('Can not create user')
    }
};

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

        const token = user.createJWT();
        res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
        return res.redirect(200, '/dashboard').json(user);
        
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

const getUser = async(req, res)=>{
    try {
        const user = await User.findById(req.params.id);

        res.status(200).json({user})
    } catch (error) {
        return res.status(401).json({msg:'No user found'})
    }

};

const logout = async(req, res)=>{
    res.clearCookie('nToken');
    return res.redirect('/index');
}

module.exports = {register, login, getUser, updateUser, deleteUser, logout}