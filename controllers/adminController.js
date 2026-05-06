import Admin from "../models/Admin.js";
import jwt from "jsonwebtoken";
import Lead from "../models/Lead.js";
import nodemailer from "nodemailer";


// 📧 EMAIL TRANSPORTER
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.GMAIL_USER,
//     pass: process.env.GMAIL_PASS,
//   },
// });

// 🔐 LOGIN
export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });

  if (!admin || admin.password !== password) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: admin._id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.json({ token });
};

// 📤 FORGOT PASSWORD — OTP BHEJO
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  const admin = await Admin.findOne({ email });

  if (!admin) {
    return res.status(404).json({ message: "Email not found" });
  }
    console.log("GMAIL_USER:", process.env.GMAIL_USER);
  console.log("GMAIL_PASS:", process.env.GMAIL_PASS);
  
   const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  // 6 digit OTP generate karo
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  admin.otp = otp;
  admin.otpExpiry = otpExpiry;
  await admin.save();

  // Email bhejo
  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: email,
    subject: "Jains Computer — Password Reset OTP",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 400px; margin: auto; padding: 30px; border: 1px solid #eee; border-radius: 10px;">
        <h2 style="color: #E31C1C;">Jains Computer</h2>
        <p>Your OTP for password reset is:</p>
        <h1 style="letter-spacing: 8px; color: #E31C1C;">${otp}</h1>
        <p>This OTP is valid for <b>10 minutes</b>.</p>
        <p style="color: #888; font-size: 12px;">If you did not request this, please ignore this email.</p>
      </div>
    `,
  });

  res.json({ message: "OTP sent to your email" });
};

// ✅ VERIFY OTP + RESET PASSWORD
export const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  const admin = await Admin.findOne({ email });

  if (!admin) {
    return res.status(404).json({ message: "Email not found" });
  }

  if (admin.otp !== otp) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  if (new Date() > admin.otpExpiry) {
    return res.status(400).json({ message: "OTP expired" });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters" });
  }

  admin.password = newPassword;
  admin.otp = null;
  admin.otpExpiry = null;
  await admin.save();

  res.json({ message: "Password reset successfully" });
};

// 🔑 UPDATE PASSWORD
export const updatePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const admin = await Admin.findById(req.admin.id);

  if (admin.password !== oldPassword) {
    return res.status(400).json({ message: "Wrong old password" });
  }

  admin.password = newPassword;
  await admin.save();

  res.json({ message: "Password updated" });
};

// 📥 GET LEADS
export const getLeads = async (req, res) => {
  const leads = await Lead.find().sort({ createdAt: -1 });
  res.json({ data: leads });
};

// ❌ DELETE
export const deleteLead = async (req, res) => {
  await Lead.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};

// 🔄 UPDATE STATUS
export const updateLeadStatus = async (req, res) => {
  const updated = await Lead.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );
  res.json({ data: updated });
};