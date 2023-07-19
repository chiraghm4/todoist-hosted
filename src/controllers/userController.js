const userSchema = require("../model/users");

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    await userSchema.create({
      username: username,
      email: email,
      password: password,
    });
    res.json({ status: "ok" });
  } catch (err) {
    console.log("error duplicate");
    res.json({ status: "error", error: "duplicate username" });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  const user = await userSchema.findOne({
    username: username,
    password: password,
  });

  if (user) {
    return res.json({ status: "ok", user: user });
  } else {
    return res.json({ status: "error", user: false });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
