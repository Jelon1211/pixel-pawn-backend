const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// @desc Login
// @route POST /auth
// @access Public
const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const foundUser = await User.findOne({ username }).exec();

  if (!foundUser) {
    return res.status(401).json({ message: "Unauthorized - User not found" });
  }

  // Hash password match
  const match = await bcrypt.compare(password, foundUser.password);

  // Normal copare password match
  // const match = foundUser.password.localeCompare(password) === 0
  if (!match)
    return res
      .status(401)
      .json({ message: "Unauthorized - Passwords do not match" });

  const accessToken = jwt.sign(
    {
      UserInfo: {
        username: foundUser.username,
        // "roles": foundUser.roles
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );

  const refreshToken = jwt.sign(
    { username: foundUser.username },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  // Create secure cookie with refresh token
  res.cookie("jwt", refreshToken, {
    httpOnly: true, //accessible only by web server
    secure: false, //https
    sameSite: "None", //cross-site cookie
    maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
  });

  // Send accessToken containing username
  res.json({ accessToken });
};

// @desc Refresh
// @route GET /auth/refresh
// @access Public - because access token has expired
const refresh = (req, res) => {
  const cookies = req.cookies;

  console.log(cookies);

  if (!cookies?.jwt)
    return res
      .status(401)
      .json({ message: "Unauthorized - Cookie has expired" });

  const refreshToken = cookies.jwt;

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) return res.status(403).json({ message: "Forbidden" });

      const foundUser = await User.findOne({
        username: decoded.username,
      }).exec();

      if (!foundUser)
        return res
          .status(401)
          .json({ message: "Unauthorized - User not found again" });

      const accessToken = jwt.sign(
        {
          UserInfo: {
            username: foundUser.username,
            // "roles": foundUser.roles
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
      );

      res.json({ accessToken });
    }
  );
};

// @desc Logout
// @route POST /auth/logout
// @access Public - just to clear cookie if exists
const logout = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //No content
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.json({ message: "Cookie cleared" });
};

const test = (req, res) => {
  console.log("jest request");
  res.json({ tak: "tak" });
};

module.exports = {
  login,
  refresh,
  logout,
  test,
};
