const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { users } = require("./users/users");
const JWT = require("jsonwebtoken");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find((oneUserInArr) => {
    return (
      oneUserInArr.username === username && oneUserInArr.password === password
    );
  });
  if (user) {
    //Generate a JSON-WEB-TOKEN to the user
    const accessToken = JWT.sign(
      { id: user.id, isAdmin: user.isAdmin },
      process.env.ACCESS_TOKEN_SECRET_KEY
    );
    res.json({
      username: user.username,
      isAdmin: user.isAdmin,
      accessToken,
    });
  } else res.status(400).json("Username or password incorrect");
});

// VERIFYING-JWT
const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1]; // authHeader = "bearer AUTH_KEY"
    JWT.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err, payload) => {
      if (err) return res.status(403).json("Token is not valid!");

      //   req.user = payload;
      next();
    });
  } else {
    res.status(401).json("Authorization not allowed");
  }
};

app.get("/api/users", verifyJWT, (req, res) => {
  res.status(200).json("good by here");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`server is running on http://localhost:${PORT}/`)
);
