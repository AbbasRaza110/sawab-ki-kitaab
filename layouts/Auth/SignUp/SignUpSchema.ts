import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SignUpFormValues } from "./SignUpContainer";

// --- Validation Schema ---
const signUpSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, "Name must be at least 2 characters")
    .required("Name is required"),
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required"),
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
export const signUpResolver = yupResolver<SignUpFormValues, any, any>(
  signUpSchema,
);
