const router = require('express').Router();
const { User, Post} = require('../../models/index');
const withAuth = require('../../utils/auth');

// Usersign up route
router.post("/user/signup", async (req, res) => {
    console.log('user sigup route');
    try {
        const userData = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        });
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            req.session.name = userData.name;
            res.status(200).json(userData);
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});
router.post("/user/login", async (req, res) => {
    console.log('user login route');
    try {
        const userData = await User.findOne({
            where: {
                email: req.body.email,
            },
        });
        if (!userData) {
            res.status(400).json({ message: "Incorrect email or password, please try again" });
            return;
        }
        const validPassword = await userData.checkPassword(req.body.password);
        if (!validPassword) {
            res.status(400).json({ message: "Incorrect email or password, please try again" });
            return;
        }
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            req.session.name = userData.name;
            res.json({ user: userData, message: "You are now logged in!" });
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});





module.exports = router;