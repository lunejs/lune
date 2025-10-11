import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Form,
  FormInput,
  FormSwitch,
  FormTextarea,
  H1
} from '@vendyx/ui';

import type { CommonProductFragment } from '@/lib/api/types';
import { Dropzone } from '@/lib/shared/components/dropzone/dropzone';

import { useProductAsset } from '../../hooks/use-product-asset';

import { useProductDetailsForm } from './use-product-details-form';

export const ProductDetails = ({ product }: Props) => {
  const form = useProductDetailsForm(product);
  const { upload, remove } = useProductAsset();

  return (
    <Form {...form}>
      <form onSubmit={form.onSubmit} className="flex flex-col gap-6">
        <header className="flex items-center justify-between">
          <H1 className="font-bold text-2xl">Add product</H1>
          <Button
            type="submit"
            isLoading={form.formState.isSubmitting}
            disabled={!form.formState.isDirty || form.formState.isSubmitting}
          >
            Save
          </Button>
        </header>
        <main className="flex flex-col gap-6 lg:grid grid-cols-6">
          <div className="col-span-4 flex flex-col gap-6">
            <Card>
              <CardHeader>
                <CardTitle>General</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                <FormInput control={form.control} name="name" label="Name" placeholder="T-Shirt" />
                <FormTextarea control={form.control} name="description" label="Description" />
                <Dropzone
                  persistenceMode={!!product}
                  previews={product?.assets.items}
                  onFilesChange={files => {
                    if (!product) {
                      form.setValue('images', files);
                      return;
                    }

                    upload(product, files);
                  }}
                  onPreviewsRemoved={async previews => {
                    if (!product) return;

                    await remove(
                      product,
                      previews.map(p => p.id)
                    );
                  }}
                />
              </CardContent>
            </Card>
          </div>
          <div className="col-span-2 flex flex-col gap-6 w-full">
            <Card>
              <CardHeader>
                <CardTitle>Status</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                <FormSwitch control={form.control} name="enabled" label="Published" />
              </CardContent>
            </Card>
          </div>
        </main>
      </form>
    </Form>
  );
};

type Props = {
  product?: CommonProductFragment | null;
};
