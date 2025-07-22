import mongoose from "mongoose";

const CredentialSchema = new mongoose.Schema({
  Username: String,
  Password: String,
});

export const Credentials = mongoose.model("Credential", CredentialSchema);
