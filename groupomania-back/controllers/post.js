var { Post } = require('../models/post');
const mongoose = require('mongoose');
const fs = require('fs');

exports.getPosts = async (req, res) => {
    const posts = await Post.find().sort({ created_at: 'desc' });
    if (posts != null) {
        return res.status(200).send(posts);
    } else {
        return res.status(500).send({ error: { message: "Une erreur est survenu" } });
    }
}

exports.getPostById = async (req, res) => {
    try {
        const postId = mongoose.Types.ObjectId(req.params);
        const post = await Post.findById(postId);

        if (post == null) {
            return res.status(404).send({ success: false });
        }
        return res.status(200).send(post);
    } catch (err) {
        return res.status(500).json({ success: false, err })
    }
}

exports.add = async (req, res) => {
    try {
        const post = new Post({
            userId: req.body.userId,
            author: req.body.author,
            content: req.body.content,
            imageUrl: req.file ? "http://localhost:3001/uploads/" + req.file.filename : '',
            likes: 0,
            usersLiked: [],
            created_at: Date.now()
        });
        await post.save();
        res.status(200).send({ message: "Success" })
    } catch (err) {
        console.log(err)
        res.status(500).send({ message: "Error", err: err });
    }
}

exports.update = async (req, res) => {
    try {
        const idPost = mongoose.Types.ObjectId(req.params.id);
        const userIdLogged = req.user._id;
        const postData = await Post.findById(idPost).select('userId imageUrl');

        if (postData.userId === userIdLogged || req.user.role === 1) {
            const post = { content: req.body.content };
            if (req.file != undefined) {
                post.imageUrl = "http://localhost:3001/uploads/" + req.file.filename;
                let currentImgName = postData.imageUrl.replace('http://localhost:3001/uploads/', './uploads/');
                try {
                    if (currentImgName != '') {
                        fs.unlinkSync(currentImgName);
                    }
                } catch (err) {
                    console.log(err);
                }
            }
            if (req.body.image) {
                const currentImgName = postData.imageUrl.replace('http://localhost:3001/uploads/', './uploads/');
                try {
                    fs.unlinkSync(currentImgName);
                    post.imageUrl = ''
                } catch (error) {
                    console.log(error)
                }
            }
            Post.findByIdAndUpdate(idPost, post, null, (err, result) => {
                if (err) return res.status(500).send(err);
                return res.status(200).send(result);
            })
        } else {
            return res.status(403).send();
        }
    } catch (err) {
        console.log(err);
    }
}

exports.delete = async (req, res) => {
    const idPost = mongoose.Types.ObjectId(req.params.id);
    const userIdLogged = req.user._id;
    try {
        let postData = await Post.findById(idPost).select('userId imageUrl');
        if (postData.userId === userIdLogged || req.user.role === 1) {
            if (postData.imageUrl != '') {
                let currentImgName = postData.imageUrl.replace('http://localhost:3001/uploads/', './uploads/');
                try {
                    fs.unlinkSync(currentImgName);
                } catch (err) {
                    console.log(err);
                }
            }
            Post.findByIdAndDelete(idPost, null, (err, result) => {
                if (err) return res.status(500).send(err);
                return res.status(200).send(result);
            })
        } else {
            res.status(403).send();
        }
    } catch (err) {
        console.log(err);
    }
}

exports.like = async (req, res) => {
    //si erreur sur l'id vérifier si userId ou idUser
    const userId = req.body.userId
    const isLiked = req.body.like
    const post = await Post.findById(req.params.id)
    const updatedFields = {}
    updatedFields.usersLiked = post.usersLiked;
    if (isLiked) {
        updatedFields.likes = post.likes += 1;
        updatedFields.usersLiked.push(userId);
    } else {
        updatedFields.likes = post.likes -= 1;
        updatedFields.usersLiked.splice(updatedFields.usersLiked.indexOf(userId));
    }

    Post.findByIdAndUpdate(req.params.id, updatedFields, null, (err, result) => {
        if (err) return res.status(500).send(err);
        return res.status(200).send(result);
    })
}