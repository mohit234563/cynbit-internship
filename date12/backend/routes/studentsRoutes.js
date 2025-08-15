const express=require('express');
const pool=require('../db/index');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const SECRET_KEY='your-key';
require('dotenv').config();
const router=express.Router();


//login
router.post('/login',async(req,res)=>{
    const {email,password}=req.body;
   
    const result=await pool.query('select *from students where email=$1',[email]);
    if(!result.rows.length===0) return res.status(401).json({error:"invalid email or password"});
    const validPass=await bcrypt.compare(password,result.rows[0].password);
    if(!validPass) return res.json(403).json({eror:"invalid user email or password"});
    const token=jwt.sign({email:result.rows.email},SECRET_KEY,{expiresIn:'1h'});
    res.status(201).json({message:"success",token});
})

router.post('/',verification,async(req,res)=>{
    const {title,content,author}=req.body;
    const result=await pool.query('insert into blogs(title, content, author, likes, created_at) VALUES ($1, $2, $3, 0, NOW()) RETURNING *',
    [title, content, author]
  );
  res.status(201).json(result.rows[0]);
});
router.get('/',async(req,res)=>{
    const blogs=await pool.query('select *from blogs ORDER BY created_at DESC');
    const comments=await pool.query('select *from comments');
    const enriched=blogs.rows.map(blog=>({
        ...blog,
        comments:comments.rows.filter(c=>c.blog_id===blog.id),
    }));
    res.json(enriched);
});
//add comment
router.post('/:id/comment',verification,async(req,res)=>{
    const{comment_text,commenter}=req.body;
    const{id}=req.params;
    const result=await pool.query('insert into comments(blog_id,comment_text,commenter,created_at)values($1,$2,$3,now())returning*',[id,comment_text,commenter]);
    res.json(result.rows[0]);
})
router.post('/:id/like',verification,async(req,res)=>{
    const {id}=req.params;
    const result=await pool.query(
        'update blogs set likes=likes+1 where id=$1 returning *',[id]
    );
    res.json(result.rows);
})
function verification(req,res,next){
    const authheader=req.headers['authorization'];
    if(!authheader) return res.status(403).json({error:"No token provided"});
    const token=authheader.split(" ")[1];
    jwt.verify(token,SECRET_KEY,(err,decoded)=>{
        if(err) return res.status(401).json({error:"invalid token"});
        req.user=decoded;
        next();
    })
}
module.exports=router;