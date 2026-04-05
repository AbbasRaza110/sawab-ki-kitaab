import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ForgotPasswordFormValues } from "./ForgotPasswordContainer";

// --- Validation Schema ---
const forgotPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required"),
});

// --- Export Resolver ---
export const forgotPasswordResolver = yupResolver<
  ForgotPasswordFormValues,
  any,
  any
>(forgotPasswordSchema);
