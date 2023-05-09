const router = require('express').Router();
const {User, Post} = require('../../models/index');
const withAuth = require('../../utils/auth');

router.get('/:id',  async (req,res)=> {
    console.log('router is firing');
    try{
        const userData = await User.findByPk(req.params.id, {
            attributes: { exclude: ['password']},
            include: [{model: Post }],
        });
        console.log(userData);
        const user = userData.get({plain: true});

        res.render('user',{
            ...user,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/',  async (req,res)=> {
    try{
    const userData = await User.findAll({
        attributes: {exclude: ['password']}, 
        include: {
            model:Post,
            as: 'posts'
        }

    });

    const user= userData.map((project)=>project.get({plain: true}));
    res.render('user',{
        user,
        logged_in: req.session.logged_in,
    });
} catch (err){
    res.status(500).json(err);
}
    
});




router.post('/', async (req,res)=> {
    try{
        const userData = await User.create(req.body);


        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json(userData);
        });
    } catch (err){
        res.status(400).json(err);
    }
});

router.post('/login', async (req,res)=> {
    try {
        const userData = await User.findOne({where:{email: req.body.email}});

        if(!userData){
            res.status(400)
            .json({message: 'Invalid email or password'});
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if(!validPassword) {
            res.status(400)
            .json({message: 'Invalid email or password'});
            return;
        }

        req.session.save(()=> {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({
                user: userData,
                message: 'Your now logged in'
            });
        });
    } catch (err){
        res.status(500).json({message:err.stack});
    }
});

router.post('/logout', (req,res)=>{
    if (req.session.logged_in) {
        req.session.destroy(()=> {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;