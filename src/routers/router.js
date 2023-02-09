const express= require("express");
const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
const User=require("../database/models/userSchema")
const router=express.Router();
// console.log(route);

router.get("/",(req,res)=>{
    res.json({message:"home page"})
})
router.post("/register", (req, res) => {
    const { name, email, phone, password, confirmPassword } = req.body;
    
    if (!name || !email || !phone || !password || !confirmPassword) {
        return res.status(400).json({ message: "Please fill in all fields." });
    }
    
    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match." });
    }
    
    // Check if user with same email already exists
    User.findOne({ email })
        .then(user => {
            if (user) {
                return res.status(400).json({ message: "Email already exists." });
            }
            
            // Hash password
            bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({ error: err });
                }
                
                const newUser = new User({
                    name,
                    email,
                    phone,
                    password: hash,
                    confirmPassword: hash
                });
                
                newUser.save()
                    .then(user => {
                        res.json({ message: "Successfully registered." });
                    })
                    .catch(error => {
                        res.status(500).json({ error });
                    });
            });
        })
        .catch(error => {
            res.status(500).json({ error });
        });
});

// login 
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Please fill in all fields." });
    }

    try {
        // Check if user with provided email exists
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Email or password is incorrect." });
        }

        // Check if provided password is correct
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Email or password is incorrect." });
        }

        res.json({ message: "Successfully logged in." });
    } catch (error) {
        res.status(500).json({ error });
    }
});








module.exports=router;