import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Form,
  FormInput,
} from '@vendyx/ui';
import { useLoginForm } from './use-login-form';

export const LoginForm = () => {
  const form = useLoginForm();

  return (
    <Card className="w-[400px]">
      <CardHeader className="gap-0">
        <h2 className="text-2xl font-semibold text-center">Welcome back</h2>
        <p className="text-sm font-normal text-muted-foreground text-center">
          Login to your vendyx account
        </p>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <Form {...form}>
          <form onSubmit={form.onSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <FormInput label="Email" control={form.control} name="email" />
              <FormInput
                label="Password"
                control={form.control}
                name="password"
                type="password"
              />
            </div>
            <Button>Login</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
