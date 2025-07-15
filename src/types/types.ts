import {z} from "zod";

const SignupInputTypes = z.object({
    name: z.string().min(1, "Nmae is required"),
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(8, "Password should be at least 8 characters long"),
  })
  
  const SigninInputTypes = z.object({
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(8, "Password should be at least 8 characters long"),
  })

  const expenseInputTypes = z.object({
    description: z
    .string()
    .min(1, { message: 'Description should not be empty' }),

    amount: z
    .number({ invalid_type_error: 'Amount must be a number' })
    .positive({ message: 'Amount must be positive' }),

    expenseType: z
    .enum(["MATCHDAY","EQUIPMENT"]),

    sessionId: z.string()
})

export {
    SignupInputTypes,
    SigninInputTypes,
    expenseInputTypes
}