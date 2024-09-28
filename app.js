
const express = require('express');
const router = express.Router();
const cors = require('cors'); // Import cors
const mysql = require('mysql2');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');


const JWT_SECRET = 'H3d$4#1f8jD2X9kA0qPlM$wZ7vE!cGh';

// Load environment variables from .env file
dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes
app.use(express.json());  // This allows your app to handle JSON requests


// Create a connection to the MySQL database
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database.');
});

// A simple route to check if the server is working
app.get('/', (req, res) => {
  res.send('Welcome to the Blood Bank Management System');
});

// Helper function to validate email
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

// Helper function to validate phone number (India)
function validatePhoneNumber(phone) {
  const re = /^[6-9]\d{9}$/; // Accepts 10-digit Indian phone numbers starting with 6-9
  return re.test(String(phone));
}


// Register route with full field validation
app.post('/register', async (req, res) => {
  const { fullName, bloodGroup, gender, dob, email, phone, state, city, username, password, confirmPassword } = req.body;

  // Validate all fields are present
  if (!fullName || !bloodGroup || !gender || !dob || !email || !phone || !state || !city || !username || !password || !confirmPassword) {
      return res.status(400).json({ error: 'All fields are required' });
  }

  // Validate email format
  if (!validateEmail(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
  }

  // Validate phone number format
  if (!validatePhoneNumber(phone)) {
      return res.status(400).json({ error: 'Invalid phone number format. Must be a 10-digit number starting with 6-9' });
  }

  // Validate password and confirm password match
  if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
  }

  try {
      // Check if the user already exists
      const [userExists] = await db.promise().query('SELECT * FROM users WHERE username = ? OR email = ? OR phone = ?', [username, email, phone]);
      if (userExists.length > 0) {
          return res.status(400).json({ error: 'User already exists' });
      }

      // Hash the password before storing it
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert the new user into the database
      const query = `
          INSERT INTO users (full_name, blood_group, gender, dob, email, phone, state, city, username, password)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      const values = [fullName, bloodGroup, gender, dob, email, phone, state, city, username, hashedPassword];

      db.query(query, values, (err, result) => {
          if (err) {
              return res.status(500).json({ error: 'Database error' });
          }
          res.status(201).json({ message: 'User registered successfully' });
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
  }
});

// Route to log in a user
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    // Check if the user exists
    const userQuery = await db.promise().query('SELECT * FROM users WHERE username = ?', [username]);
    const user = userQuery[0][0];
    
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
  
    // Check if the password is correct
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
  
    // Generate a JWT token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    // Send the token back to the user
    res.json({ token });
  });

// Middleware to protect routes
// function authenticateToken(req, res, next) {
//   console.log(req);
//     const token = req.header('Authorization');
//     if (!token) {
//       return res.status(401).json({ message: 'Access denied' });
//     }
  
//     try {
//       const verified = jwt.verify(token, process.env.JWT_SECRET);
//       req.user = verified;  // Attach the user info to the request
//       next();
//     } catch (err) {
//       res.status(400).json({ message: 'Invalid token' });
//     }
//   }

function authenticateToken(req, res, next) {
  const token = req.header('Authorization');
  if (!token) {
      return res.status(401).json({ message: 'Access denied' });
  }

  try {
      const verified = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET); // Make sure to split and get the token
      req.user = verified; // Attach the user info to the request
      next();
  } catch (err) {
      res.status(400).json({ message: 'Invalid token' });
  }
}

  app.post('/change-password', authenticateToken, async (req, res) => {
    const { currentPassword, newPassword } = req.body;
  
    // Fetch the user from the database
    const userId = req.user.id; // Get user ID from the token
    const userQuery = await db.promise().query('SELECT * FROM users WHERE id = ?', [userId]);
    const user = userQuery[0][0];
  
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
  
    // Check if the current password is correct
    const validPassword = await bcrypt.compare(currentPassword, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: 'Current password is incorrect' });
    }
  
    // Hash the new password and update it in the database
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    await db.promise().query('UPDATE users SET password = ? WHERE id = ?', [hashedNewPassword, userId]);
  
    res.json({ message: 'Password changed successfully' });
  });

// Assuming you have Express and MySQL already set up
app.get('/donors', async (req, res) => {
  try {
      const [rows] = await db.promise().query('SELECT full_name, blood_group, gender, DATE_FORMAT(dob, "%d-%m-%Y") AS dob, email, phone, state, city FROM users');

      // No need to format the date again, it’s already formatted in SQL
      res.json(rows);
  } catch (error) {
      console.error('Error fetching donors:', error);
      res.status(500).json({ error: 'Database error' });
  }
});

app.get('/search', async (req, res) => {
  const { state, city, bloodGroup } = req.query;
  
  // Build the query based on provided parameters
  let query = 'SELECT full_name, blood_group, gender, DATE_FORMAT(dob, "%d-%m-%Y") AS dob, email, phone, state, city FROM users WHERE 1=1';
  const params = [];

  if (state) {
      query += ' AND state = ?';
      params.push(state);
  }
  if (city) {
      query += ' AND city = ?';
      params.push(city);
  }

  if (bloodGroup) {
      query += ' AND blood_group = ?';
      params.push(bloodGroup);
  }

  try {
      const [rows] = await db.promise().query(query, params);
      res.json(rows);
  } catch (error) {
      console.error('Error fetching donors:', error);
      res.status(500).json({ error: 'Database error' });
  }
});

// app.put('/updateAccount', authenticateToken, async (req, res) => {
//   console.log(req);


//   res.json({message : 'ok'});

  // try {
  //     const query = `
  //         UPDATE users 
  //         SET full_name = ?, blood_group = ?, gender = ?, dob = ?, email = ?, phone = ?, state = ?, city = ? 
  //         WHERE id = ?
  //     `;
  //     await db.promise().query(query, [fullName, bloodGroup, gender, dob, email, phone, state, city, userId]);

  //     res.status(200).json({ message: 'Account updated successfully' });
  // } catch (error) {
  //     console.error('Error updating account:', error);
  //     res.status(500).json({ error: 'Database error' });
  // }
// });

// Verify JWT Middleware
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) return res.status(403).send('Token is required');
  
  const token = authHeader.split(' ')[1]; // Remove 'Bearer' from the header
  if (!token) return res.status(403).send('Token missing');

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) return res.status(401).send('Invalid token');
      req.user = decoded; // Store the decoded user info in the request
      next();
  });
};


app.post('/update-account', verifyToken, (req, res) => {
  const { fullName, bloodGroup, gender, dob, email, phone, state, city } = req.body;
  const userId = req.user.id;
  console.log(userId);

  if (!fullName || !bloodGroup || !gender || !dob || !email || !phone || !state || !city) {
      return res.status(400).send({ message: 'All fields are required.' });
  }

  const query = `UPDATE blood_bank.users SET full_name = ?, blood_group = ?, gender = ?, dob = ?, email = ?, phone = ?, state = ?, city = ? WHERE id = ?`;
  db.query(query, [fullName, bloodGroup, gender, dob, email, phone, state, city, userId], (err, result) => {
      console.log(err);
      console.log(result);
      if (err) return res.status(500).send({ message: 'Database error.' });
      res.send({ message: 'Account updated successfully.' });
  });
});

// app.post('/update-account',async (req,res) => {
//   console.log(req);
  
//   const { fullName, bloodGroup, gender, dob, email, phone, state, city } = req.body;
//   const userId = req.user.id;

//   if (!fullName || !bloodGroup || !gender || !dob || !email || !phone || !state || !city) {
//       return res.status(400).json({ error: 'All fields are required' });
//   }

//   console.log(fullName);

//   res.status(200).json({ message : 'ok'});
// });

// Delete account route
app.delete('/deleteAccount', verifyToken, async (req, res) => {
  try {
      const userId = req.user.id;  // Extract user ID from token
      console.log(userId);
      const deleteQuery = 'DELETE FROM users WHERE id = ?';

      // Execute deletion
      db.query(deleteQuery, [userId], (error, results) => {
          if (error) {
            console.log(error);
              return res.status(500).json({ message: 'Error deleting account' });
          }

          if (results.affectedRows === 0) {
              return res.status(404).json({ message: 'Account not found' });
          }

          res.status(200).json({ message: 'Account deleted successfully' });
      });
  } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;




// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
