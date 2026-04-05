import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ResetPasswordFormValues } from "./ResetPasswordContainer";

// --- Validation Schema ---
const resetPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});

// --- Export Resolver ---
export const resetPasswordResolver = yupResolver<
  ResetPasswordFormValues,
  any,
  any
>(resetPasswordSchema);
