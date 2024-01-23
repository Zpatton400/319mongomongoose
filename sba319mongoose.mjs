const mongoose = require('mongoose');

// User Schema
const UserSchema = new mongoose.Schema({
 email: { type: String, required: true, unique: true },
 firstName: { type: String, default: '' },
 lastName: { type: String, default: '' },
 phone: String,
});

// Indexes
UserSchema.index({ email: 1 });

// Post Schema
const PostSchema = new mongoose.Schema({
 title: { type: String, required: true },
 content: { type: String, required: true },
 author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

// Indexes
PostSchema.index({ title: 1 });

// Comment Schema
const CommentSchema = new mongoose.Schema({
 text: { type: String, required: true },
 post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
 author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

// Indexes
CommentSchema.index({ text: 1 });

// Models
const User = mongoose.model('User', UserSchema);
const Post = mongoose.model('Post', PostSchema);
const Comment = mongoose.model('Comment', CommentSchema);

const express = require('express');
const router = express.Router();

// User Routes are refactored with Mongoose functions
router.get('/users', async (req, res) => {
 const users = await User.find();
 res.send(users);
});

router.post('/users', async (req, res) => {
 const user = new User(req.body);
 await user.save();
 res.send(user);
});

router.put('/users/:id', async (req, res) => {
 const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
 res.send(user);
});

router.delete('/users/:id', async (req, res) => {
 await User.findByIdAndDelete(req.params.id);
 res.sendStatus(204);
});

// Post Routes
router.get('/posts', async (req, res) => {
 const posts = await Post.find().populate('author');
 res.send(posts);
});

router.post('/posts', async (req, res) => {
 const post = new Post(req.body);
 await post.save();
 res.send(post);
});

router.put('/posts/:id', async (req, res) => {
 const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
 res.send(post);
});

router.delete('/posts/:id', async (req, res) => {
 await Post.findByIdAndDelete(req.params.id);
 res.sendStatus(204);
});

// Comment Routes
router.get('/comments', async (req, res) => {
 const comments = await Comment.find().populate(['post', 'author']);
 res.send(comments);
});

router.post('/comments', async (req, res) => {
 const comment = new Comment(req.body);
 await comment.save();
 res.send(comment);
});

router.put('/comments/:id', async (req, res) => {
 const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true });
 res.send(comment);
});

router.delete('/comments/:id', async (req, res) => {
 await Comment.findByIdAndDelete(req.params.id);
 res.sendStatus(204);
});

module.exports = router;

const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();
app.use(express.json());
app.use(routes);

// Establish a connection to the MongoDB database named 'digitalLibrary'.
// The options { useNewUrlParser: true, useUnifiedTopology: true } are passed to avoid deprecation warnings.
// Once the connection is established, a message is logged to the console indicating success.
// If there's an error while connecting, the error is caught and logged to the console.
mongoose.connect('mongodb://localhost/digitalLibrary', { useNewUrlParser: true, useUnifiedTopology: true })
 .then(() => console.log('Connected to MongoDB'))
 .catch(err => console.error('Could not connect to MongoDB...', err));


// What could you have done differently during the planning stages of your project to make the execution easier?
// During the planning stages, I could have created a more detailed outline of the server's architecture, including the data models and the relationships between them. This would have made it easier to structure the routes and middleware.

// Were there any requirements that were difficult to implement?
// Implementing custom middleware for JSON body parsing was a bit challenging. Using a well-known library like body-parser would make this easier in future projects.

// What do you think would make them easier to implement in future projects?
// In future projects, I would definitely use a well-known library like body-parser for handling JSON body parsing. This would save a lot of time and effort.

// What would you add to or change about your application if given more time?
// If given more time, I would add user authentication, the ability to edit and delete comments, and a more sophisticated search feature that includes filtering by multiple criteria. I would also add more robust error handling and validation for the API endpoints.

// Notes for future self:
// - Plan thoroughly before starting to code. Outline the server's architecture, data models, and relationships.
// - Consider using well-known libraries for common tasks. They can save a lot of time and effort.
// - Add features like user authentication, editing and deleting comments, and a sophisticated search feature.
// - Improve error handling and validation for the API endpoints.
