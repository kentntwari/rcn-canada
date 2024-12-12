import { z } from "zod";

export const formIntentSchema = z.enum(["register-first-timer"]);
export const firstTimerSchema = z.object({
  fullName: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.object({
    countryCode: z.string().regex(/^\+[1-9][0-9]{0,3}$/, {
      message: "Country code must start with + and contain 1-4 digits",
    }),
    phone: z
      .string()
      .regex(/^[0-9]+$/, {
        message: "Phone number must contain only digits",
      })
      .min(6, "Phone number must be at least 6 digits")
      .max(15, "Phone number must not exceed 15 digits"),
  }),
  address: z.object({
    street: z.string(),
    city: z.string(),
    state: z.string(),
    postalCode: z.string(),
    country: z.string(),
  }),
  gender: z.enum(["male", "female"], {
    required_error: "Required",
  }),
  maritalStatus: z.enum(["single", "married", "divorced"]),
  isBornAgain: z.enum(["yes", "no"]),
  isBaptized: z.enum(["yes", "no"]),
  isTongueSpeaker: z.enum(["yes", "no"]),
  wantsHolySpirit: z.enum(["yes", "no"]),
  willBeMessaged: z.enum(["yes", "no"]),
  departmentOfInterest: z
    .enum([
      "choir",
      "sound",
      "media",
      "scribes",
      "protocol",
      "sanctuary keeper",
      "children teacher",
    ])
    .optional(),
  description: z.object({
    service: z
      .string()
      .max(250, { message: "cannot exceed 250 characters" })
      .optional(),
    prayerRequest: z
      .string()
      .max(1000, { message: "cannot exceed 1000 characters" })
      .optional(),
  }),
});
