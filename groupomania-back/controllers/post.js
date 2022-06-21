var { Post } = require('../models/post');
const mongoose = require('mongoose');
const fs = require('fs');

exports.getPosts = async (req, res) => {
    const posts = await Post.find();
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
        const bodyPost = JSON.parse(req.body.post);
        const post = new Post({
            userId: bodyPost['userId'],
            content: bodyPost['content'],
            imageUrl: req.file.filename == null ? '' : "http://localhost:3000/uploads/" + req.file.filename,
            likes: 0,
            usersLiked: [],
            created_at: Date.now()
        });
        await post.save();
        res.status(200).send({ message: "Success" })
    } catch (err) {
        res.status(500).send({ message: "Error", err: err });
    }
}

exports.update = async (req, res) => {
    try {
        const idPost = mongoose.Types.ObjectId(req.params.id);
        const userIdLogged = req.user._id;
        const postData = await Post.findById(idPost).select('userId, imageUrl');

        if (postData.userId === userIdLogged || postData.role === 1) {
            const post = { content: req.body.content };
            if (req.file != undefined) {
                post.imageUrl = "http://localhost:3000/uploads/" + req.file.filename;
                let currentImgName = postData.imageUrl.replace('http://localhost:3000/uploads/', '');
                try {
                    fs.unlinkSync('./uploads/' + currentImgName);
                } catch (err) {
                    console.log(err);
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
        let postData = await Post.findById(idPost).select('userId, imageUrl');
        if (postData.userId === userIdLogged || postData.role === 1) {
            if (postData != undefined) {
                let currentImgName = postData.imageUrl.replace('http://localhost:3000/uploads/', '');
                try {
                    fs.unlinkSync('./uploads/' + currentImgName);
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

// A modifier

// exports.like = async (req, res) => {
//     const userId = req.body.userId;
//     const likeValue = req.body.like;
//     const post = await Post.findById(req.params.id);
//     const updatedFields = {}
//     switch (likeValue) {
//         case 1:
//             updatedFields.likes = post.likes += 1;
//             updatedFields.usersLiked = post.usersLiked;
//             updatedFields.usersLiked.push(userId);
//             break;
//         case 0:
//             updatedFields.usersLiked = post.usersLiked;
//             if(updatedFields.usersLiked.includes(userId)){
//                updatedFields.likes = post.likes -= 1;
//                updatedFields.usersLiked.splice(updatedFields.usersLiked.indexOf(userId));
//             } else {
//                 updatedFields.usersDisliked = post.usersDisliked;
//                 updatedFields.dislikes = post.dislikes -= 1;
//                 updatedFields.usersDisliked.splice(updatedFields.usersDisliked.indexOf(userId));
//             }
//             break;
//         default:
//             break;
//     }
//     Sauce.findByIdAndUpdate(req.params.id, updatedFields, null, (err, result) => {
//         if(err) return res.status(500).send(err);
//         return res.status(200).send(result);
//     })
// }