const router = require('express').Router();
const {Post,Comments } = require('../models');



router.get('/', async (req,res)=> {
 try {
    const allPost = await Post.findAll({
        include: [{
            attributes:['title','content','date_created'],
        },
   ],
    });
          

     const posts = allPost.map((post)=> post.get({plain: true}));

     res.render('homepage',{
     
        posts,
        loggedIn: req.session.loggedIn,
        
    });
   } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
   
});





router.get('/login', (req,res)=> {
    if (!req.session.loggedIn){
        res.redirect('/user');
        return;
    }

    res.render('/login');
});

module.exports = router;