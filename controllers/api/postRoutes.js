const router = require('express').Router();
const {Post,User}= require('../../models/index');
const withAuth = require('../../utils/auth');

router.post('/',withAuth, async (req,res)=>{
    try{
        const newPost =await Post.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newPost);
    } catch(err){
        res.status(500).json(err);
    }
});
router.get('/:id', async(req,res)=>{
    console.log('this is firing')
    try{
        const postData = await Post.findByPk(req.params.id,{
            include: [
              {  model: User,
                attributes:['name'],
              },
            ],
        });
        console.log(postData);
          
        const post = postData.get({plain: true});
     console.lot( res.status(200).json(post));

        res.render('post',{
            post,
            logged_in: req.session.logged_in
        });
    } catch(err){
        res.status(500).json(err);
    }
});
router.get('/', async (req,res)=>{
    try {
        const postData = await Post.findAll({
            include:[ {
                model: User,
                attributes: ['name']
            }],
        });
        const post =postData.map((post)=>post.get({ plain: true}));
        res.render('post', {
            ...post,
            logged_in: req.session.logged_in
        });


    } catch (err){
        res.status(500).json(err);
    }
});

router.put('/:id',withAuth, async (req,res)=> {
    try{
        const postData = await Post.update({
            
            where: {content:req.body.content}
        });
        const post = postData.map((post)=>post.get({plain: true}));
        res.render('post', {
            ...post,
            logged_in:req.session.logged_in
        });
    } catch(err){
        res.status(500).json(err);
    }
});


router.delete('/:id',withAuth, async (req,res)=>{
    try{
        const postData = await Post.destroy({
            where:{
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!postData){
            res.status(404).json({message: 'No post found'});
            return;
        }
        res.status(200).json(postData);
    } catch (err){
        res.status(500).json(err);
    }
});
module.exports =router;