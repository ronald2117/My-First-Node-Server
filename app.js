const express = require('express'); //Node frameworks for making server easily
const morgan = require('morgan'); //Third Party Middleware
const mongoose = require('mongoose'); //import Object Document Model library
const Blog = require('./models/blog'); //import schemas/model

//express app
const app = express();

//connect to mongoDB
const dbURI = 'mongodb+srv://ronald2117:roscelia00905311248@cluster0.tlhyl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
mongoose.connect(dbURI,{ useNewUrlParser: true, useUnifiedTopology: true })
	.then((result) => {
		app.listen(3000);
		console.log('Connected to Database');
	})
	.catch((err) => console.log(err));

//register view engine
app.set('view engine', 'ejs');
console.log('Server running at http://127.0.0.1:3000/');

//middleware and static files
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));

//routes
app.get('/', (req, res) => {
	res.render('main', { title: 'Home'});
});
app.get('/about', (req, res) => {
	res.render('about', { title: 'About'});
});
app.get('/contacts', (req, res) => {
	res.render('contacts', { title: 'Contacts'});
});
app.get('/blogs', (req, res) => {
	Blog.find().sort({ createdAt: -1 })
		.then((result) => {
			res.render('blogs', { title: 'All Blogs', blogs: result})
		})
})

app.get('/blogs/create', (req, res) => {
	res.render('create', { title: 'Create Blog'});
})

app.post('/blogs', (req, res) => {
	const blog = new Blog(req.body);
	blog.save()
		.then((result) => {
			res.redirect('/blogs');
		})
		.catch((err) => {
			console.log(err);
		})
})
app.get('/blogs/:id', (req, res) => {
	const id = req.params.id;
	Blog.findById(id)
		.then((result) => {
			res.render('details', {blog: result, title: 'Blog Details' })
		})
		.catch(err => {
			console.log(err);
		})
})
//delete
app.delete('/blogs/:id', (req, res) => {
	const id = req.params.id;

	Blog.findByIdAndDelete(id)
		.then(result => {
			res.json({ redirect: '/blogs'});
		})
		.catch(err => {
			console.log(err);
		});
})
//default
app.use((req, res) => {
	res.status(404).render('404', { title: '404'});
});
