import { useEffect, useState } from 'react';
import { EyeIcon } from 'lucide-react';

import { Label } from '@lune/ui';

import type { CommonAssetFragment, CommonCustomFieldDefinitionFragment } from '@/lib/api/types';
import { useGetAssets } from '@/lib/asset/hooks/use-get-assets';
import { AssetSelector } from '@/shared/components/asset-selector/asset-selector';
import { SpinnerLoader } from '@/shared/components/loader/spinner-loader';

import { CustomFieldEntityPreview } from './shared/preview/custom-field-entity-preview';
import { CustomFieldPreviewContainer } from './shared/preview/custom-field-preview-container';

export const ImageCustomField = ({ definition, defaultValues, onChange }: Props) => {
  const { isLoading, assets: fetchedAssets } = useGetAssets();

  const [assets, setAssets] = useState<CommonAssetFragment[]>([]);

  useEffect(() => {
    if (defaultValues) setAssets(fetchedAssets.filter(fa => defaultValues?.includes(fa.id)));
  }, [fetchedAssets]);

  // placeholder while default values are not available
  if (defaultValues?.length && isLoading) {
    return (
      <div className="group flex flex-col items-center gap-2 md:flex-row md:gap-4">
        <Label className="w-full">{definition.name}</Label>
        <CustomFieldPreviewContainer className="relative">
          <SpinnerLoader className="absolute right-1" />
        </CustomFieldPreviewContainer>
      </div>
    );
  }

  return (
    <AssetSelector
      defaultSelected={fetchedAssets.filter(fa => defaultValues?.includes(fa.id))}
      onDone={assets => {
        const newAssets = definition.isList ? assets : assets.length ? [assets[0]] : [];

        setAssets(newAssets);

        const ids = newAssets.map(asset => asset.id);
        if (definition.isList) onChange(ids.length ? ids : null);
        else onChange(ids[0] ?? null);
      }}
    >
      <div className="group grid grid-cols-1 items-center gap-2 md:grid-cols-[25%_1fr] md:gap-4">
        <Label className="w-full">{definition.name}</Label>
        <CustomFieldPreviewContainer className="relative">
          {assets.map(asset => (
            <CustomFieldEntityPreview key={asset.id} title={asset.filename} image={asset.source} />
          ))}
          {!!assets.length && (
            <button
              type="button"
              className="opacity-0 absolute right-0 w-8 flex justify-center items-center h-full bg-accent group-hover:opacity-100 transition-opacity before:absolute before:-left-4 before:top-0 before:h-full before:w-4 before:bg-linear-to-r before:from-transparent before:to-accent before:pointer-events-none"
              onClick={e => {
                e.stopPropagation();
                // TODO: add preview for entities
              }}
            >
              <EyeIcon size={16} />
            </button>
          )}
        </CustomFieldPreviewContainer>
      </div>
    </AssetSelector>
  );
};

type Props = {
  defaultValues?: string[];
  onChange: (assetIds: null | string | string[]) => void;
  definition: CommonCustomFieldDefinitionFragment;
};
