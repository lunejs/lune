export const FormMessages = {
  required: 'Required field',
  invalidEmail: 'Invalid email',
  invalidPhoneNumber: 'Invalid phone number',
  min: (min: number) => `Must be at least ${min} characters long`,
  max: (max: number) => `Cannot exceed ${max} characters`,
  greater: (value: number) => `Must be greater than ${value}`,
  less: (value: number) => `Must be less than ${value}`
};
