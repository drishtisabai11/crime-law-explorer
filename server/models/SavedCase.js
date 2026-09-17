import mongoose from "mongoose";

const savedCaseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    caseId: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// A user can save a case only once
savedCaseSchema.index(
  { user: 1, caseId: 1 },
  { unique: true }
);

const SavedCase = mongoose.model("SavedCase", savedCaseSchema);

export default SavedCase;