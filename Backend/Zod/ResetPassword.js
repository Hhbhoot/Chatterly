import { z } from 'zod';

const ResetPasswordSchema = z
  .object({
    password: z.string(),
    confirmPassword: z.string(),
    token: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export default ResetPasswordSchema;
