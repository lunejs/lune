import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const useLoginForm = () => {
  const form = useForm<FormInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: FormInput) => {
    console.log('Form submitted:', data);
  };

  return {
    ...form,
    onSubmit: form.handleSubmit(onSubmit),
  };
};

const schema = z.object({
  email: z.email('Invalid email'),
  password: z.string().min(1, 'Password is required'),
});

type FormInput = z.infer<typeof schema>;
