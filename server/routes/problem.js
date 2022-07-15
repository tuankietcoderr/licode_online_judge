const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");

const Problem = require("../models/Problem");

// @route GET api/problems
// @desc Get problems
// @access Private
router.get("/", verifyToken, async (req, res) => {
  try {
    const problems = await Problem.find({ user: req.userId }).populate("user", [
      "username",
    ]);
    res.json({ success: true, problems });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @route POST api/problems
// @desc Create problem
// @access Private
router.post("/", verifyToken, async (req, res) => {
  const { title, description, examples, details, hint } = req.body;

  // Simple validation
  if (!title)
    return res
      .status(400)
      .json({ success: false, message: "Title is required" });

  try {
    const newProblem = new Problem({
      title,
      description,
      examples,
      details,
      hint,
    });

    await newProblem.save();

    res.json({
      success: true,
      message: "Problem created!",
      problem: newProblem,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @route PUT api/problems
// @desc Update problem
// @access Private
router.put("/:id", verifyToken, async (req, res) => {
  const { title, description, examples, details, hint } = req.body;

  // Simple validationd
  if (!title)
    return res
      .status(400)
      .json({ success: false, message: "Title is required" });

  try {
    let updatedProblem = {
      title,
      description: description || "",
      examples: examples || [],
      details: details || {},
      hint: hint || "",
    };

    const problemUpdateCondition = { _id: req.params.id, user: req.userId };

    updatedProblem = await Problem.findOneAndUpdate(
      problemUpdateCondition,
      updatedProblem,
      { new: true }
    );

    // User not authorised to update problem or problem not found
    if (!updatedProblem)
      return res.status(401).json({
        success: false,
        message: "Problem not found or user not authorised",
      });

    res.json({
      success: true,
      message: "Excellent progress!",
      problem: updatedProblem,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @route DELETE api/problems
// @desc Delete problem
// @access Private
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const problemDeleteCondition = { _id: req.params.id, user: req.userId };
    const deletedProblem = await Problem.findOneAndDelete(
      problemDeleteCondition
    );

    // User not authorised or problem not found
    if (!deletedProblem)
      return res.status(401).json({
        success: false,
        message: "Problem not found or user not authorised",
      });

    res.json({ success: true, problem: deletedProblem });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
