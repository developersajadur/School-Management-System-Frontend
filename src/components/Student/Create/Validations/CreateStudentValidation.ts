import * as z from "zod"

export const createStudentValidation = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["admin", "teacher", "student"]),
  phone: z.string().min(5, "Phone number is too short").max(20, "Phone number is too long"),

  rollNumber: z.string().min(1, "Roll number is required"),
  className: z.string().min(1, "Class name is required"),
  section: z.string().min(1, "Section is required"),

  guardian: z.object({
    name: z.string().min(1, "Guardian name is required"),
    phone: z.string().min(5, "Guardian phone is too short"),
    relation: z.string().min(1, "Relation is required"),
  }),

  dateOfBirth: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),

  address: z.string().min(1, "Address is required"),

  assignedTeacher: z.string().optional(),
})

export type StudentFormValues = z.infer<typeof createStudentValidation>
