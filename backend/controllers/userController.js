let users = [];

console.log("Users DB:", users);

const registerUser = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  const userExists = users.find(u => u.email === email);

  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const newUser = {
    id: Date.now(),
    email,
    password,
  };

  users.push(newUser);

  res.json({ message: "User registered successfully", user: newUser });
};

const loginUser = (req, res) => {
  const { email, password } = req.body;

  const user = users.find(
    u => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.json({ message: "Login successful", user });
};

module.exports = {
  registerUser,
  loginUser,
};