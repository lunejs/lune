import { Button, Card, CardContent, CardHeader, Form, FormInput, H3, Muted } from '@lunejs/ui';

import { useLoginForm } from './use-login-form';

export const LoginForm = () => {
  const form = useLoginForm();

  return (
    <Card className="max-w-[400px] w-full">
      <CardHeader className="gap-0">
        <H3 className="text-2xl font-semibold text-center">Welcome back</H3>
        <Muted className="text-sm font-normal text-muted-foreground text-center">
          Login to your Lune account
        </Muted>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <Form {...form}>
          <form onSubmit={form.onSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <FormInput
                label="Email"
                control={form.control}
                name="email"
                placeholder="m@example.com"
              />
              <FormInput label="Password" control={form.control} name="password" type="password" />
            </div>
            <Button isLoading={form.isLoading}>Login</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
