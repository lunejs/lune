import { useState } from 'react';

import { Label } from '@lune/ui';

import type { CommonAssetFragment, CommonCustomFieldDefinitionFragment } from '@/lib/api/types';
import { AssetSelector } from '@/shared/components/asset-selector/asset-selector';

import { CustomFieldEntityPreview } from './shared/preview/custom-field-entity-preview';
import { CustomFieldPreviewContainer } from './shared/preview/custom-field-preview-container';

export const ImageCustomField = ({ definition, onChange }: Props) => {
  const [assets, setAssets] = useState<CommonAssetFragment[]>([]);

  return (
    <AssetSelector
      onDone={assets => {
        const newAssets = definition.isList ? assets : assets.length ? [assets[0]] : [];

        setAssets(newAssets);

        const ids = newAssets.map(asset => asset.id);
        if (definition.isList) onChange(ids.length ? ids : null);
        else onChange(ids[0] ?? null);
      }}
    >
      <div className="flex items-center gap-4">
        <Label className="w-full">{definition.name}</Label>
        <CustomFieldPreviewContainer>
          {assets.map(asset => (
            <CustomFieldEntityPreview key={asset.id} title={asset.filename} image={asset.source} />
          ))}
        </CustomFieldPreviewContainer>
      </div>
    </AssetSelector>
  );
};

type Props = {
  onChange: (assetIds: null | string | string[]) => void;
  definition: CommonCustomFieldDefinitionFragment;
};
