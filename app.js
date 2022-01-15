const express = require('express'); //Node frameworks for making server easily
const morgan = require('morgan'); //Third Party Middleware
const mongoose = require('mongoose'); //import Object Document Model library
const blogRoutes = require('./routes/blogRoutes');

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
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

//routes
app.get('/', (req, res) => {
	res.redirect('/blogs');
});
app.get('/about', (req, res) => {
	res.render('about', { title: 'About'});
});
app.get('')
//blog routes
app.use('/blogs', blogRoutes);

//default
app.use((req, res) => {
	res.status(404).render('404', { title: '404'});
});
