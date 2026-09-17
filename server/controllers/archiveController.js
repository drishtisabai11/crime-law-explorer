import SavedCase from "../models/savedCase.js";

// Get current user's saved cases
export const getSavedCases = async (req, res) => {
  try {
    const savedCases = await SavedCase.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      savedCases,
    });
  } catch (error) {
    console.error("Get saved cases error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while fetching saved cases",
    });
  }
};

// Save a case
export const saveCase = async (req, res) => {
  try {
    const { caseId } = req.body;

    if (caseId === undefined || caseId === null) {
      return res.status(400).json({
        success: false,
        message: "Case ID is required",
      });
    }

    const existingSavedCase = await SavedCase.findOne({
      user: req.user._id,
      caseId: Number(caseId),
    });

    if (existingSavedCase) {
      return res.status(409).json({
        success: false,
        message: "Case is already saved",
      });
    }

    const savedCase = await SavedCase.create({
      user: req.user._id,
      caseId: Number(caseId),
    });

    return res.status(201).json({
      success: true,
      message: "Case saved successfully",
      savedCase,
    });
  } catch (error) {
    console.error("Save case error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while saving case",
    });
  }
};

// Remove a saved case
export const removeSavedCase = async (req, res) => {
  try {
    const { caseId } = req.params;

    const deletedCase = await SavedCase.findOneAndDelete({
      user: req.user._id,
      caseId: Number(caseId),
    });

    if (!deletedCase) {
      return res.status(404).json({
        success: false,
        message: "Saved case not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Case removed from archive",
    });
  } catch (error) {
    console.error("Remove saved case error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while removing case",
    });
  }
};