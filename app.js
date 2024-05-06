const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

// express app
const app = express();

// connect to mongodb & listen for requests
const dbURI = "mongodb+srv://ahask93:IntroToNode@introtonode.oxvvdl8.mongodb.net/IntroToNode?retryWrites=true&w=majority";

mongoose.connect(dbURI)
  .then(result => app.listen(3000))
  .catch(err => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

// routes
app.use(authRoutes);
app.get('*', checkUser);

app.get('/', (req, res) => {
  res.redirect('/signup');
});

app.get('/about', requireAuth, (req, res) => {
  res.render('about', { title: 'About' });
});

// blog routes
app.use('/blogs', requireAuth, blogRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
