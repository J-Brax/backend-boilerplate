const isAuthenticated = (req, res, next) => {
  if (req.session.userId) {
    return res.json({ message: "You are already logged in" });
  }
  next();
};

const isAllowed = (req, res, next) => {
  if (!req.session.userId) {
    return res.json({ error: "Unauthorized Access" });
  }
  next();
};

export { isAuthenticated, isAllowed };
