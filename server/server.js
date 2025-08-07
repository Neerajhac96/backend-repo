const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const protectedRoutes = require('./routes/protected');
const authMiddleware = require('./middleware/authMiddleware');
const path = require('path');
// const cors = require('cors');
// app.use(cors());


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// ✅ Serve all public static files (like index.html, style.css etc.)
app.use(express.static(path.join(__dirname, '../client')));

// ✅ Serve static subdirectories individually
app.use('/auth', express.static(path.join(__dirname, '../client', 'auth')));
app.use('/blog', express.static(path.join(__dirname, '../client', 'blog')));
app.use('/gallery', express.static(path.join(__dirname, '../client', 'gallery')));
app.use('/contact', express.static(path.join(__dirname, '../client', 'contact')));
app.use('/chatbot', express.static(path.join(__dirname, '../client', 'chatbot')));

// ✅ Serve protected static files with JWT middleware
app.use('/protected', authMiddleware, express.static(path.join(__dirname, '../client', 'protected')));

// ✅ API routes
app.use('/api/auth', authRoutes);
app.use('/api', protectedRoutes);

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

// ✅ Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
