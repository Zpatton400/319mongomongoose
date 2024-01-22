//Define Mongoose schemas for collections and documents in the MongoDB database.
import mongoose from 'mongoose';

const gradeSchema = new mongoose.Schema({
  student_id: Number,
  class_id: Number,
  grade: String // or Number, depending on how grades are stored
});

//Rejplace the MongoDB driver with Mongoose methods for all database interactions.

const Grade = mongoose.model('Grade', gradeSchema);

export default Grade;

import express from "express";
// import db from "../db/conn.mjs"; // Comment out MongoDB driver import
import Grade from "../models/Grade.mjs"; // Import Mongoose model

const router = express.Router();

// Get a single grade entry
router.get("/student/:id", async (req, res) => {
  // let collection = await db.collection("grades"); // Comment out MongoDB driver code
  let query = { student_id: Number(req.params.id) };
  // let result = await collection.find(query).toArray(); // Comment out MongoDB driver code
  let result = await Grade.find(query); // Use Mongoose model method

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// Get a class's grade data
router.get("/class/:id", async (req, res) => {
  // let collection = await db.collection("grades"); // Comment out MongoDB driver code
  let query = { class_id: Number(req.params.id) };
  // let result = await collection.find(query).toArray(); // Comment out MongoDB driver code
  let result = await Grade.find(query); // Use Mongoose model method

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

export default router;