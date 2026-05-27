import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();

app.use(cors());
app.use(express.json());

// CONNECT TO MONGODB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

// SCHEMA
const appointmentSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String
});

// MODEL
const Appointment = mongoose.model("Appointment", appointmentSchema);

// SAVE DATA
app.post("/api/appointments", async (req, res) => {
  const newAppointment = new Appointment(req.body);
  await newAppointment.save();

  res.json({ message: "Saved successfully" });
});

// GET DATA
app.get("/api/appointments", async (req, res) => {
  const appointments = await Appointment.find();
  res.json(appointments);
});

// ROOT ROUTE
app.get("/", (req, res) => {
  res.send("Backend is working");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
