const con = require("../utils/db");
const bcrypt = require('bcrypt');

const saltRounds = 10;

const registerHandler = async (req, res) => {
  const { username, email, password } = req.body;
  
  //utuk memvalidasi email apakah valid
  const emailIsValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  if (!email || !password) {
    res.status(400).json({ error: "Email and Password required" });
    return;
  }

  if (!emailIsValid) {
    res.status(400).json({ error: "Invalid Email Format" });
    return;
  }

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    await new Promise((resolve, reject) => {
      con.query(
        'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
        [username, email, hashedPassword],
        (error, results, fields) => {
          if (error) {
            if (error.code === "ER_DUP_ENTRY") {
              const errorMessage = "email already registered";
              reject(new Error(errorMessage));
            } else {
              reject(error);
            }
          } else {
            resolve(results);
          }
        }
      );
    });

    return res.status(200).json({ message: "User registered Successfull" });
  } catch (error) {
    return res
      .status(error.code || 500)
      .json({ error: "Internal Server Error" });
  }
};

const loginHandler = (req, res) => {
  res.send("<h1>handler work</h1>");
};

module.exports = {
  loginHandler,
  registerHandler,
};
