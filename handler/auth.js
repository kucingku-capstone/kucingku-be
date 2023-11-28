const notes = require("../model/notes");

// const loginHandler = (req, res) => {
//   const { username, password } = req.payload;

//   const newNotes = {
//     username,
//     password,
//   };

//   notes.push(newNotes);

//   const isSuccess = notes.filter((note) => note.username).length > 0;

//   if (!isSuccess) {
//     const response = res.send({
//       status: "fail",
//       message: "gagal login",
//     });
//     response.code(500);
//     return response;
//   }
//   const response = res.send({
//     status: "success",
//     message: "berhasil login",
//   });
//   response.code(201);
//   return response;
// };

const loginHandler = (req, res) => {
    res.send('<h1>handler work</h1>')
}

const registerHandler = (req, res) => {
    res.send('<h1>regis handler work</h1>')
}

module.exports = {
  loginHandler,
  registerHandler
};
