const jwt  = require("jsonwebtoken");
const userModel = require("../Models/userModel");

const usersRegistration = async function (req, res) {
  try {
    const data = req.body;
    const { title, name, mobile, email, password } = data;

    if (Object.keys(data).length == 0)
      return res
        .status(400)
        .send({ status: false, msg: "Please fill all the details" });
    if (!title)
      return res
        .status(400)
        .send({ status: false, msg: "Please fill the title" });
    if (!name)
      return res
        .status(400)
        .send({ status: false, msg: "Please fill the name" });
    if (!mobile)
      return res
        .status(400)
        .send({ status: false, msg: "Please fill the mobile Number" });
    if (mobile) {
      const checkmobile = await userModel.findOne({ mobile: mobile });
      if (checkmobile)
        return res
          .status(400)
          .send({
            status: false,
            msg: "This mobile Number is already registered",
          });
    }
    if (!email)
      return res
        .status(400)
        .send({ status: false, msg: "Please fill the email Id" });
    if (email) {
      const checkEmail = await userModel.findOne({ email: email });
      if (checkEmail)
        return res
          .status(400)
          .send({ status: false, msg: "this email Id is already registered" });
    }
    if (!password)
      return res
        .status(400)
        .send({ status: false, msg: "Please fill the password" });
    if (password) {
      const checkPassword = await userModel.findOne({ password: password });
      if (checkPassword)
        return res
          .status(400)
          .send({ status: false, msg: "This password is already registered" });
    }

    const saveData = await userModel.create(data);
    res
      .status(201)
      .send({
        status: true,
        message: "user successfully Register",
        data: saveData,
      });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const userLogin = async function (req, res) {
  try {
    const data = req.body;
    const { email, password } = data;
    if (Object.keys(data).length == 0)
      return res
        .status(400)
        .send({ status: false, msg: "Please fill all the details" });
    const checkData = await userModel.findOne({
      email: email,
      password: password,
    });
    if (!checkData)
      return res
        .status(400)
        .send({
          status: false,
          msg: "Please provide the register email Id and password",
        });

    let token = jwt.sign(
      {
        userId: checkData._id.toString(),
      },
      "very-very-secret-key"
    );
    res.setHeader("x-api-key", token);
    res.send({ status: true, token: token });

  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};

module.exports = { usersRegistration, userLogin };
