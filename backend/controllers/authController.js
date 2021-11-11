import User from "../models/user.js";
import sendToken from "../utils/jwtToken.js";

// Register a user   => /api/v1/register
export const registerUser = async (req, res) => {
  try {
    const { emailId, username, password, region } = req.body;

    // Check userName if already exists
    const checkUsername = await User.findOne({ username });
    if (checkUsername) {
      return res.status(401).json({
        success: false,
        message: "Username already registered",
      });
    }

    // Check email if already exists
    const checkEmailId = await User.findOne({ emailId });
    if (checkEmailId) {
      return res.status(401).json({
        success: false,
        message: "Email already registered",
      });
    }

    const user = await User.create({
      emailId,
      username,
      password,
      region,
    });
    sendToken(user, 200, res);
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error,
    });
  }
};

// Login User  =>  /api/v1/login
export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Checks if email and password is entered by user
    if (!username || !password) {
      return res.status(401).json({
        success: false,
        message: "Please enter username & password",
      });
    }

    // Finding user in database
    const user = await User.findOne({ username }).select("+password");

    if (!user) {
      res.status(401).json({
        success: false,
        message: "Invalid Username or Password",
      });
    }

    // Checks if password is correct or not
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
      res.status(401).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    sendToken(user, 200, res);
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error,
    });
  }
};

// Logout user   =>   /api/v1/logout
export const logout = async (req, res) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      message: "Logged out",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error,
    });
  }
};

// single user   =>   /api/v1/user/:id
export const singleUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
  }
};
