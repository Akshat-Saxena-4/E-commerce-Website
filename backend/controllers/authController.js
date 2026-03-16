const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {

  const { name, email, password, role } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    name,
    email,
    password: hashedPassword,
    role
  });

  await user.save();

  res.json({ message: "User registered" });
};

exports.login = async (req, res) => {

  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.json({ message: "User not found" });
  }

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    return res.json({ message: "Wrong password" });
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    "secretkey"
  );

  res.json({ token });
};