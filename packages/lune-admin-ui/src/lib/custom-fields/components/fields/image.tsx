import { useState } from 'react';

import { Badge, cn, Label } from '@lune/ui';

import type { CommonAssetFragment, CommonCustomFieldDefinitionFragment } from '@/lib/api/types';
import { AssetSelector } from '@/shared/components/asset-selector/asset-selector';

export const ImageCustomField = ({ definition, onChange }: Props) => {
  const [assets, setAssets] = useState<CommonAssetFragment[]>([]);

  return (
    <AssetSelector
      onDone={assets => {
        onChange(assets[0].id);
        setAssets([assets[0]]);
      }}
    >
      <div className="flex items-center gap-4">
        <Label className="w-full">{definition.name}</Label>
        <div
          className={cn(
            'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
            'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
            'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
            'w-3/4 shrink-0 px-1'
          )}
        >
          {assets.map(asset => (
            <Badge variant={'secondary'} className="bg-background">
              <img src={asset.source} alt={asset.filename} className="w-5 h-5 rounded" />
              {asset.filename.length > 15 ? `${asset.filename.slice(0, 15)}...` : asset.filename}
            </Badge>
          ))}
        </div>
      </div>
    </AssetSelector>
  );
};

type Props = {
  onChange: (assetId: string) => void;
  definition: CommonCustomFieldDefinitionFragment;
};
