import User from "../models/user.model.js";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";

const sendOtpMail = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Validate required fields
    if (!email.trim()) {
      return res.status(400).json({ message: " Email is required " });
    }

    // Check if the username already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "Email already exists try another" });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "dhk7283013741@gmail.com",
        pass: process.env.GPASS,
      },
    });

    const mailOptions = {
      from: "dhk7283013741@gmail.com",
      to: email,
      subject: "Your OTP Code",
      html: `
        <div style="background-color:#f4f4f4; padding:20px; border-radius:10px; text-align:center; font-family:Arial, sans-serif;">
          <h2 style="color:#333;">Your OTP Code</h2>
          <p style="font-size:18px; color:#555;">Use the following OTP to proceed:</p>
          <h1 style="color:#1a73e8; font-size:32px; margin:10px 0;">${otp}</h1>
          <p style="color:#777;">This OTP is valid for only 10 minutes. Do not share it with anyone.</p>
          <hr style="margin:20px 0;">
          <p style="font-size:14px; color:#888;">If you didn’t request this, please ignore this email.</p>
        </div>
      `,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.error("Email error:", error);

        // Handle invalid email error
        if (error.response && error.response.includes("550")) {
          return res.status(400).send({
            status: false,
            message:
              "The email address does not exist. Please enter a valid email.",
          });
        }

        // Handle invalid email format
        if (error.code === "EENVELOPE") {
          return res.status(400).send({
            status: false,
            message: "Invalid email format. Please check the email address.",
          });
        }

        // Handle other errors
        return res.status(500).send({
          status: false,
          message: "Failed to send email. Please try again later.",
        });
      }

      console.log("Email sent: " + info.response);
      res.status(200).send({
        status: true,
        message: "Email has been sent successfully.",
      });
    });
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).json({ message: "An error occurred during registration" });
  }
};

const signup = async (req, res) => {
  try {
    const { email, full_name, password } = req.body;

    // Validate required fields
    if (!email.trim() || !full_name.trim() || !password.trim()) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the username already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }

    // Create a new user
    const newUser = new User({
      email,
      full_name,
      password,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: newUser._id,
        full_name: newUser.full_name,
      },
    });
  } catch (error) {
    // console.error("Error during user registration:", error);
    res.status(500).json({ message: "An error occurred during registration" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by username
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: `User not found with ${email}` });
    }

    // Check if the password matches
    const isMatch = await user.checkPassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // Generate JWT token
    const token = user.generateJWTToken();

    // Configure cookie options
    // const cookieOptions = {
    //   httpOnly: true,
    //   maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    //   secure: process.env.NODE_ENV === "production",
    //   sameSite: process.env.NODE_ENV === "production" ? "Strict" : "Lax",
    // };

    // Set the token in an HTTP-only cookie
    //res.cookie("accessToken", token, cookieOptions);

    // Send success response
    res.status(200).json({
      message: "Login successful",
      data: {
        token,
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "An error occurred during login" });
  }
};

const sendOtpMailforReset = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Validate required fields
    if (!email.trim()) {
      return res.status(400).json({ message: " Email is required " });
    }

    // Check if the username already exists
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res
        .status(409)
        .json({ message: "User not found with this email try another" });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "dhk7283013741@gmail.com",
        pass: process.env.GPASS,
      },
    });

    const mailOptions = {
      from: "dhk7283013741@gmail.com",
      to: email,
      subject: "Your OTP Code",
      html: `
        <div style="background-color:#f4f4f4; padding:20px; border-radius:10px; text-align:center; font-family:Arial, sans-serif;">
          <h2 style="color:#333;">Your OTP Code</h2>
          <p style="font-size:18px; color:#555;">Use the following OTP to proceed:</p>
          <h1 style="color:#1a73e8; font-size:32px; margin:10px 0;">${otp}</h1>
          <p style="color:#777;">This OTP is valid for only 10 minutes. Do not share it with anyone.</p>
          <hr style="margin:20px 0;">
          <p style="font-size:14px; color:#888;">If you didn’t request this, please ignore this email.</p>
        </div>
      `,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.error("Email error:", error);

        // Handle invalid email error
        if (error.response && error.response.includes("550")) {
          return res.status(400).send({
            status: false,
            message:
              "The email address does not exist. Please enter a valid email.",
          });
        }

        // Handle invalid email format
        if (error.code === "EENVELOPE") {
          return res.status(400).send({
            status: false,
            message: "Invalid email format. Please check the email address.",
          });
        }

        // Handle other errors
        return res.status(500).send({
          status: false,
          message: "Failed to send email. Please try again later.",
        });
      }

      console.log("Email sent: " + info.response);
      res.status(200).send({
        status: true,
        message: "Email has been sent successfully.",
      });
    });
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).json({ message: "An error occurred during registration" });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { newPassword, email } = req.body;

    if (!newPassword) {
      return res.status(400).json({
        success: false,
        message: "New password is required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Hash new password
    const haspassword = await bcrypt.hash(newPassword, 10);
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { password: haspassword },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Password reset successfully",
      updatedUser,
    });
  } catch (error) {
    console.error("Reset Password Error:", error);
    res.status(500).json({
      success: false,
      message: "Error resetting password",
      error: error.message,
    });
  }
};

const getDetails = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "userId is required",
      });
    }

    const user = await User.findOne({ userId });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Details retrive successfully",
      user: {
        full_name: user?.full_name,
        email: user?.email,
      },
    });
  } catch (error) {
    console.error(" Error:", error);
    res.status(500).json({
      success: false,
      message: "Error getting details",
      error: error.message,
    });
  }
};

export {
  signup,
  login,
  sendOtpMail,
  resetPassword,
  sendOtpMailforReset,
  getDetails,
};
