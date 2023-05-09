const router = require('express').Router();
const {Post}= require('../../models/index');
const withAuth = require('../../utils/auth');

router.post('/post',withAuth, async (req,res)=>{
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
router.get('/post/:id', async(req,res)=>{
    try{
        const postData = await Post.findByPK(req.params.id,{
            include: [
              {  model: User,
                attributes:['name'],
              },
            ],
        });
           res.status(200).json(postData);
        const post = postData.get({plain: true});
     

        res.render('post',{
            ...post,
            logged_in: req.session.logged_in
        });
    } catch(err){
        res.status(500).json(err);
    }
});
// router.get('/post', async (req,res)=>{
//     try {
//         const postData = await Post.findAll().
//     }
// })

// router.put('/:id',withAuth, async (req,res)=> {

// })
module.exports =router;