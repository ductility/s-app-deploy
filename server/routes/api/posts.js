const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get Posts
router.get('/', async (req, res) => {
    const posts = await loadPostCollection();
    res.send(await posts.find({}).toArray());
});

// Add Post
router.post('/', async (req, res) => {
    const posts = await loadPostCollection();
    await posts.insertOne({
        userID: req.body.userID,
        title: req.body.title,
        description: req.body.description,
        dataSet: {},
        createdAt: new Date()
    });
    res.status(201).send();
});

// Delete Post
router.delete('/:id', async (req, res) => {
    const posts = await loadPostCollection();
    await posts.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send();
});



async function loadPostCollection() {
    const client = await mongodb.MongoClient.connect
    ('mongodb+srv://ys:ys@s-app.ciw6r.mongodb.net/s-app?retryWrites=true&w=majority',{
        useNewUrlParser: true
    });

    return client.db('s-app').collection('posts');
}





module.exports = router;