const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const token = req.headers["authorization"]; // Token from frontend

  if (!token) {
    // If request from browser (HTML), redirect:
    if (req.accepts("html")) {
      return res.redirect("/auth/login.html");
    }
    return res.status(401).json({ msg: "Access Denied: Token Missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next(); // Proceed
  } catch (err) {
    if (req.accepts("html")) {
      return res.redirect("/auth/login.html");
    }
    return res.status(403).json({ msg: "Invalid Token" });
  }
}

module.exports = verifyToken;
