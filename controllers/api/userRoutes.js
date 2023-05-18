const router = require('express').Router();
const { User, Post} = require('../../models/index');
// const withAuth = require('../../utils/auth');

router.get('/user', async (req, res) => {
    try {
        const userData = await User.findAll({
            attributes: { exclude: ['password'] },
            include: {
                model: Post,
                as: 'posts'
            }

        });
        const users = userData.map((user) => user.get({ plain: true }));
router.get('/:id', async (req, res) => {
    console.log('router is firing');
    try {
        const userData = await User.findByPk(req.params.id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Post }],
        });
        console.log(userData);
        const user = userData.get({ plain: true });

        res.render('user', {
            ...user,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});



        const user = userData.map((project) => project.get({ plain: true }));
        res.render('user', {
            user,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }

});




router.post('/user/signup', async (req, res) => {
    try {
        const userData = await User.create(req.body,{
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,

        }); 
        res.status(200).json(userData);

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
        });
       


    } catch (err) {
        res.status(400).json(err);
    }

});

router.post('/user/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { email: req.body.email } });

        if (!userData) {
            res.status(400).json({ message: 'Invalid email or password' });
            return;
        }

        const validPassword = userData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400)
                .json({ message: 'Invalid email or password' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.name = userData.name;
            req.session.logged_in = true;

            res.status(200).json({
                user: userData,
                message: 'Your now logged in'
            });
        });
    } catch (err) {
        console.error("Error in login route", err)
        res.status(500).json({ message: err });
    }
});

router.post('/user/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;