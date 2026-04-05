import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SignInFormValues } from "./SignInContainer";

// --- Validation Schema ---
const signInSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

// --- Export Resolver ---
export const signInResolver = yupResolver<SignInFormValues, any, any>(
  signInSchema,
);
