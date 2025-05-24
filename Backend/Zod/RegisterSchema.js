import zod from 'zod';

const RegisterSchema = zod.object({
  name: zod.string().min(3).max(20),
  email: zod.string().email(),
  password: zod
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .regex(/[A-Z]/, {
      message: 'Password must contain at least one uppercase letter',
    })
    .regex(/[a-z]/, {
      message: 'Password must contain at least one lowercase letter',
    })
    .regex(/[0-9]/, { message: 'Password must contain at least one number' })
    .regex(/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/, {
      message: 'Password must contain at least one special character',
    }),
});

export default RegisterSchema;
