import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// SIMPLE "DATABASE" (in memory)
let appointments = [];

// SAVE DATA
app.post("/api/appointments", (req, res) => {
  appointments.push(req.body);
  res.json({ message: "Saved successfully" });
});

// GET DATA
app.get("/api/appointments", (req, res) => {
  res.json(appointments);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
