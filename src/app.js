require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const setAuthVariable = require('./middleware/authMiddleware');
const User = require('./models/customersModel')
const path = require('path');
const app = express();

const crypto = require('crypto');
const secretKey = crypto.randomBytes(32).toString('hex');

// Connect to database
connectDB();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '..', 'static')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));

// Initialize Passport and restore authentication state
app.use(cookieParser());
app.use(session({
    secret: secretKey,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Use the middleware to set authentication variables
app.use(setAuthVariable);

// Passport Google OAuth Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
},
async (accessToken, refreshToken, profile, done) => {
    try {
        // Find the user in the database based on their googleId
        let user = await User.findOne({ googleId: profile.id });
        console.log(user)
        console.log('Google Client ID:', process.env.GOOGLE_CLIENT_ID);
        console.log('Google Client Secret:', process.env.GOOGLE_CLIENT_SECRET);
        console.log('Google Callback URL:', process.env.GOOGLE_CALLBACK_URL);
        if (user) {
            // User exists, proceed with the user
            console.log('ff')
            return done(null, user);
        } else {
            // User does not exist, create a new user
            console.log('gg')
            user = new User({
                googleId: profile.id,
                name: profile.displayName,
                email: profile.emails[0].value, // Google's email field
                profilePhoto: profile.photos[0].value // Google's profile photo field
            });
            await user.save();
            console.log('hh')
            return done(null, user);
        }
    } catch (error) {
      console.log('ii')
        return done(error.message, null);
    }
}));

// Serialize user information to be stored in the session
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserialize user information from the session
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});

// Routes
app.use('/', require('./routes/index'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT} as http://localhost:${PORT}`));
