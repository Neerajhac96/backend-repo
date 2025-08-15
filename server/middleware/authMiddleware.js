const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  // accept header case-insensitively
  const authHeader = req.headers["authorization"] || req.headers["Authorization"];
  let token = null;

  if (authHeader && typeof authHeader === "string") {
    // If frontend uses "Bearer <token>", extract the token part
    if (authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    } else {
      token = authHeader;
    }
  }

  if (!token) {
    if (req.accepts("html")) {
      return res.redirect("/auth/login.html");
    }
    return res.status(401).json({ msg: "Access Denied: Token Missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    if (req.accepts("html")) {
      return res.redirect("/auth/login.html");
    }
    return res.status(403).json({ msg: "Invalid Token" });
  }
}

module.exports = verifyToken;
