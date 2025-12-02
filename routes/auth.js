import express from 'express';
import User from '../models/User.js';
import { body, validationResult } from 'express-validator';
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import fetchuser from '../middleware/fetchuser.js';
import Note from '../models/Notes.js';

const router = express.Router();
const JWT_SECRET = "your_jwt_secret_key_here";

//Route1: Create a new user
router.post('/createuser', [
  body('name', 'Name must be at least 3 characters').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be at least 5 characters').isLength({ min: 5 })
], async (req, res) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false,
        errors: errors.array() 
      });
    }

    // Check if user already exists
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ 
        success: false,
        error: 'A user with this email already exists' 
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    
    // Create new user
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    // Generate JWT token
    const payload = {
      user: {
        id: user.id
      }
    };
    
    const authToken = jwt.sign(payload, JWT_SECRET);
    
    // Send success response
    res.status(201).json({ 
      success: true, 
      authToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
    
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Server error during registration',
      message: error.message 
    });
  }
});

//Route2: Login user
router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password cannot be empty').exists()
], async (req, res) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false,
        errors: errors.array() 
      });
    }

    const { email, password } = req.body;
    
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ 
        success: false,
        error: 'Invalid email or password' 
      });
    }
    
    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ 
        success: false,
        error: 'Invalid email or password' 
      });
    }
    
    // Generate JWT token
    const payload = {
      user: {
        id: user.id
      }
    };
    
    const authToken = jwt.sign(payload, JWT_SECRET);
    
    // Send success response
    res.json({ 
      success: true, 
      authToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
    
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Server error during login',
      message: error.message 
    });
  }
});


//Route3: Get loggedin user details
router.post('/getuser', fetchuser, async (req, res) => {
  try {
    console.log('GET /api/auth/getuser called');
    console.log('User ID from token:', req.user.id);
    
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    
    if (!user) {
      console.log('User not found for ID:', userId);
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    // Get total notes count for this user
    const notesCount = await Note.countDocuments({ user: userId });
    console.log('Found user:', { id: user._id, name: user.name, notesCount });
    
    // Send response in the format the frontend expects
    res.json({
      success: true,
      ...user._doc,  // Spread all user fields
      notesCount     // Add notes count
    });
    
  } catch (error) {
    console.error('Error in /getuser:', error);
    res.status(500).json({
      success: false,
      error: 'Internal Server Error',
      message: error.message
    });
  }
});

export default router;