import { type FC } from 'react';

import { isLast } from '@lune/common';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Checkbox,
  cn,
  Input
} from '@lune/ui';

import { VariantItem } from '../variant-item/variant-item';
import { useVariantContext, type VariantContext } from '../variants.context';

export const VariantGroup: FC<Props> = ({ variants, groupName }) => {
  const { variants: AllVariants, updateVariants } = useVariantContext();

  if (!variants.length) return null;

  const totalStock = variants.reduce(
    (acc, variant) => acc + (Number.isNaN(variant.stock) ? 0 : variant.stock),
    0
  );

  // const thereAreNewVariants = variants.some(v => !isUUID(v.id));

  return (
    <Accordion type="single" collapsible className="w-full pt-3">
      <AccordionItem value="item-1">
        <div className="flex items-center pb-4 px-6">
          <div className="w-full flex items-center gap-4">
            <Checkbox
              checked={variants.every(v => v.selected)}
              onCheckedChange={checked =>
                updateVariants(
                  AllVariants.map(v => {
                    if (variants.some(variant => variant.id === v.id)) {
                      return { ...v, selected: Boolean(checked) };
                    }

                    return v;
                  })
                )
              }
            />
            {/* <VariantAssetUploader
              isLoading={isLoading || removeLoading}
              size="md"
              disabled={thereAreNewVariants} // can upload images only when all variants are saved
              image={groupImage}
              onRemove={() => {
                removeVariantImage(variants.map(v => v.id));
              }}
              onUpload={file => {
                addVariantImage(
                  variants.map(v => v.id),
                  file
                );
              }}
            /> */}
            {/* <V2AssetUploaderButton
              variantsInGroup={variants.map(v => v.id)}
              disabled={thereAreNewVariants}
            /> */}

            <div className="aspect-square"></div>

            <div className="flex flex-col gap-2 items-start">
              <p className="w-fit" data-testid={`group-name-${groupName}`}>
                {groupName}
              </p>
              <AccordionTrigger className="py-0">
                <p className="w-fit text-nowrap">{variants.length} variants</p>
              </AccordionTrigger>
            </div>
          </div>
          <div className="flex gap-2 items-center w-full">
            <Input
              placeholder="$ 0.00"
              onChange={e => {
                const price = e.target.value;

                updateVariants(
                  AllVariants.map(v => {
                    if (variants.some(variant => variant.id === v.id)) {
                      return { ...v, price };
                    }

                    return v;
                  })
                );
              }}
            />
            <Input placeholder="0" disabled value={totalStock} />
          </div>
        </div>

        <AccordionContent className="flex flex-col border-t pb-0 divide-y">
          {variants.map((variant, idx) => (
            <VariantItem
              className={cn(isLast(idx, variants) && 'rounded-b-md')}
              key={variant.id}
              variant={variant}
              groupName={groupName}
            />
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

type Props = {
  variants: VariantContext['variants'];
  groupName: string;
};
