import mailer from "../service/nodemailer.js";
import bcrypt from "bcrypt";
import smtpMailer from "../service/nodemailer.js";
import jwt from "jsonwebtoken";
import { create, find, findUserByEmail, verifyUser } from "../db/queries.js";

export const greetings = async (req, res) => {
  res.status(200).send("<h1>Welcome !!</h1>");
};

export const createUser = async (req, res) => {
  try {
    const body = req.body;
    const allUsers = await find();

    const existingUser = allUsers.find((user) => user.email === body.email);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);
    await create(
      body.first_name,
      body.last_name,
      body.email,
      hashedPassword,
      body.is_admin,
      false
    );

    const token = jwt.sign(
      {
        id: body.id,
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        is_admin: body.is_admin,
      },
      process.env.JWT_SECRET
    );

    const verificationUrl = `${process.env.WEBAPP_BASE_URL}/verify-email?token=${token}`;

    // Send verification email
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: body.email,
      subject: "Email Verification",
      text: `Please verify your email by clicking on the link: ${verificationUrl}`,
    };

    await smtpMailer.sendMail(mailOptions);
    res.status(200).json({ message: "Verification email sent!" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Something went wrong.", error: e });
  }
};

export const verifyUserEmail = async (req, res) => {
  const { token } = req.query;

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    try {
      if (err) {
        return res.status(400).json({ message: "Invalid or expired token." });
      }
      const allUsers = await find();
      const user = allUsers.find((user) => user.email === decoded.email);
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
      if (user.is_verified) {
        return res.status(404).json({ message: "User already verified." });
      }

      await verifyUser(user.id);

      res.status(200).json({ message: "Email verified successfully!" });
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: "Something went wrong.", error: e });
    }
  });
};

export const adminLogin = async (req, res) => {
  try {
    const body = req.body;

    if (!body?.email || !body?.password) {
      return res
        .status(404)
        .json({ message: "Email or password not provided" });
    }

    const users = await findUserByEmail(body.email);

    if (users.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = users[0];

    if (!user?.is_admin) {
      return res
        .status(401)
        .json({ message: "You are not allowed to login from here" });
    }
    const isMatch = await bcrypt.compare(body.password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const data = {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      is_admin: user.is_admin,
    };
    const token = jwt.sign(data, process.env.JWT_SECRET);

    res.status(200).json({ token, data });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Something went wrong.", error: e });
  }
};
