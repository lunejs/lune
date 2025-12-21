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
        const newAssets = definition.isList ? assets : [assets[0]];

        onChange(newAssets.map(asset => asset.id));
        setAssets(newAssets);
      }}
    >
      <div className="flex items-center gap-4">
        <Label className="w-full">{definition.name}</Label>
        <CustomFieldPreviewContainer>
          {assets.map(asset => (
            <CustomFieldEntityPreview title={asset.filename} image={asset.source} />
          ))}
        </CustomFieldPreviewContainer>
      </div>
    </AssetSelector>
  );
};

type Props = {
  onChange: (assetIds: string[]) => void;
  definition: CommonCustomFieldDefinitionFragment;
};
