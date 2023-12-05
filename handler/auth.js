const con = require("../utils/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const saltRounds = 10;
const secretKey = process.env.KUCINGKU_JWT_SECRET;

//utuk memvalidasi email apakah valid
const emailIsValid = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isEmailRegistered = async (email) => {
  return new Promise((resolve, reject) => {
    con.query(
      "SELECT COUNT(*) AS count FROM users WHERE email = ?",
      [email],
      (error, results, fields) => {
        if (error) {
          reject(error);
        } else {
          const count = results[0].count;
          resolve(count > 0);
        }
      }
    );
  });
};

const registerHandler = async (req, res) => {
  try {
    const { username, email, password } = req.body;


    if (!emailIsValid(email)) {
      res.status(400).json({ error: "Invalid Email Format" });
      return;
    }

    if (!email || !password) {
      res.status(400).json({ error: "Email and Password required" });
      return;
    }

    // Check if the email is already registered
    const emailAlreadyRegistered = await isEmailRegistered(email);
    if (emailAlreadyRegistered) {
      res.status(400).json({ error: "Email already registered" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await new Promise((resolve, reject) => {
      con.query(
        "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
        [username, email, hashedPassword],
        (error, results, fields) => {
          if (error) {
            console.error("Database error:", error);
            reject(error);
          } else {
            resolve(results);
          }
        }
      );
    });

    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Handler error:", error);
    res.status(error.code || 500).json({ error: "Internal Server Error" });
  }
};

//handler login
const loginHandler = async (req, res) => {
  const { email, password } = req.body;

  if (!emailIsValid(email)) {
    res.status(400).json({ error: "Invalid Email Format" });
    return;
  }

  try {
    const results = await new Promise((resolve, reject) => {
      con.query(
        `SELECT * FROM users WHERE email= ?`,
        [email],
        (error, results, fields) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        }
      );
    });

    if (results.length === 0) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }

    const hashedPassword = results[0].password;

    const passwordMatch = await bcrypt.compare(password, hashedPassword);

    if (!passwordMatch) {
      res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign(
      {
        userId: results[0].id,
        email: results[0].email,
      },
      secretKey,
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  loginHandler,
  registerHandler,
};
