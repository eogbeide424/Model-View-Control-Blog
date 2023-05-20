const router = require('express').Router();
const { Post, Comments, User } = require('../models');



router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
         
         include: [
                {
                    model: User,
                    attributes: ["name"],
                },
                {
                    model: Comments,
                    
                    attributes: [
                        "post_id",
                        "user_id",
                        "user_comment",
                    ],
                },
            ],
        });


        const posts = postData.map((post)=>post.get({ plain: true })
        );

        res.render('homepage', {
            posts,  
            loggedIn: req.session.logged_in,
    });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }

});

router.get('/comments/:id',async (req,res)=>{
try{
    const commentsData= await Comments.findByPk(req.params.id);

  const comments= commentsData.map((comment)=>comment.get({plain: true}));
  res.render('homepage',{
    ...comments,
    loggedIn: req.session.logged_in,
  });
}catch(err){
    console.error("\n--------DID NOT RENDER : ------/n",err);
}
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/login", (req, res) => {
    if (req.session.logged_in) {
      console.log("logged in");
      res.redirect("/");
      return;
    }
    res.render("userLogin");
  });

module.exports = router;