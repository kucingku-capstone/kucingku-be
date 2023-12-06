const con = require("../utils/db");
const bcrypt = require("bcrypt");

const saltRounds = 10;

//validasi email
const emailIsValid = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

//validasi email duplicat
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

const updateUserHandler = async (req, res) => {
  try {
    const userId = req.params.id;
    const { username, email, password, telp, alamat, roles } = req.body;

    if (!emailIsValid(email)) {
      res.status(400).json({ error: "Invalid Email Format" });
      return;
    }

    const emailAlreadyRegistered = await isEmailRegistered(email);
    if (emailAlreadyRegistered) {
      res.status(400).json({ error: "Email already registered" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await new Promise((resolve, reject) => {
      con.query(
        "UPDATE users SET username = ?, email = ?, password = ?, telp = ?, alamat = ?, roles = ? WHERE id = ?",
        [username, email, hashedPassword, telp, alamat, roles, userId],
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
    res.status(200).json({ message: "User profile updated successfully" });
  } catch (error) {
    console.error("Handler error:", error);
    res.status(error.code || 500).json({ error: "Internal Server Error" });
  }
};


const deleteUserHandler = async (req, res) => {
  try {
    const userId = req.params.id;

    await new Promise((resolve, reject) => {
      con.query(
        "DELETE FROM users WHERE id = ?",
        [userId],
        (error, results, fields) => {
          if (error) {
            console.error("Database error:", error);
            reject(error);
          } else {
            console.log("User deleted successfully");
            resolve(results);
          }
        }
      );
    });

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Handler error:', error);
    res.status(error.code || 500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { updateUserHandler, deleteUserHandler };
