import { z } from 'zod';

const ForgotPasswordSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
});

export default ForgotPasswordSchema;
