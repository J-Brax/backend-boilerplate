import bcrypt from "bcrypt";
import User from "../models/userModel.js";

const register = async (req, res) => {
  const { name, username, password } = req.body;

  const hashedPassword = await bcrypt.hashSync(password, 10);

  await User.create({
    name,
    username,
    password: hashedPassword,
  });
  res.status(201).json({ message: "User registered" });
};

const login = async (req, res) => {
  const { username, password } = req.body;
  // find username in db
  const user = await User.findOne({ username });
  if (!user) {
    return res.json({ error: "Invalid Credentials" });
  }
  // check password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.json({ error: "Invalid Credentials" });
  }
  //save to session
  req.session.userId = user._id;
  res.json({ message: "Login successful" });
};

const logout = (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      return res.json({ error: "Logout failed", message: error.message });
    }
    res.clearCookie("connect.sid");
    res.json({ message: "Logout successful" });
  });
};

export { register, login, logout };
