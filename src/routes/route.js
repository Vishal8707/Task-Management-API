const express = require("express");
const { authentication, authorization } = require("../middleWare/Auth");

const {createTask} = require("../Controllers/taskController")

const {
  usersRegistration,
  userLogin,
} = require("../Controllers/userController");

const router = express.Router();

router.get("/test-me", function (req, res) {
  res.send({ test: "Test-API" });
});

router.post("/register", usersRegistration);

router.post("/login", userLogin);

router.post("/createTask", authentication, authorization, createTask)

router.all("/*", function (req, res) {
  res.status(404).send({ status: false, msg: "Invalid HTTP request" });
});
module.exports = router;
