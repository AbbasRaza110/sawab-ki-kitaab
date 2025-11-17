import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AddDeedFormValues } from "./AddDeedContainer";

// --- Validation Schema ---
const addDeedSchema = yup.object().shape({
  notes: yup.string().max(100, "Notes cannot exceed 100 characters").optional(),
  amount: yup
    .number()
    .min(1, "Amount must be at least 1")
    .required("Amount is required"),
});

// --- Export Resolver ---
export const addDeedResolver = yupResolver<AddDeedFormValues>(addDeedSchema);
