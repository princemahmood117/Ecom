import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { sendEmail } from '../utils/sendEmail.js';

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });

export const registerUser = async (req, res) => {
  try {
    const { fullName, phone, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already registered. Please login.' });

    const user = await User.create({ fullName, phone, email, password });

    // format
      // sendEmail(bookingData?.guest?.email, {
      //   subject : "Booking Successful",
      //   message : `Congratulations for the booking.Thank you for staying with stayvista. Transaction id : ${bookingData.transactionId}`
      // })

      // actual msge
    // await sendEmail(
    //   email,
    //   'Congratulations & Welcome!',
    //   `<h2>Welcome, ${fullName}! 🎉</h2><p>Congratulations on joining Cosmetics Shop. We're thrilled to have you!</p>`
    // );

    // test
    await sendEmail(
      email, {
        subject :  'Congratulations & Welcome abroad!',
        message : `<h2>Welcome, ${fullName}! 🎉</h2><p>Congratulations on joining Cosmetics Shop. We're thrilled to have you!</p>`
      }
    );

    res.status(201).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      profilePhoto: user.profilePhoto,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(401).json({ message: 'User not registered. Please sign up first.' });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    res.json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      profilePhoto: user.profilePhoto,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMe = async (req, res) => {
  res.json(req.user);
};