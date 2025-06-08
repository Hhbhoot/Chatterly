import { z } from 'zod';

export const ValidateTokenSchema = z.object({
  token: z.string(),
});

export default ValidateTokenSchema;
