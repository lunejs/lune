import { UploadIcon } from 'lucide-react';
import { Fragment } from 'react/jsx-runtime';

import { isLast } from '@lunejs/common';
import { Button, Label } from '@lunejs/ui';

import { AssetSelector } from '../asset-selector/asset-selector';

import { AssetUploaderEmptyState } from './empty-state/asset-uploader-empty-state';
import { AssetUploaderItem } from './item/asset-uploader-item';
import { useAssetUploader } from './use-asset-uploader';

/**
 * @description
 * Manage the assets of your entity.
 *
 * @example
 * <AssetUploader
 *   persistenceMode={!!entity}
 *   defaultAssets={entity.assets}
 *   onAssetsChange={assets => {
 *     if (!entity) {
 *        form.setValue('assets', assets.map(a => a.id));
 *        return;
 *      }
 *
 *      updateEntityAssets(entity, assets);
 *    }}
 * />
 */
export const AssetUploader = ({
  onAssetsChange,
  defaultAssets = [],
  persistenceMode = false,
  max = 50
}: Props) => {
  const { assets, selected, addSelectedAssets, toggleAsset, onRemoveAssets } = useAssetUploader(
    onAssetsChange,
    defaultAssets,
    persistenceMode,
    max
  );

  if (!assets.length) {
    return <AssetUploaderEmptyState onAssetsAdd={addSelectedAssets} />;
  }

  return (
    <div className="flex flex-col gap-2">
      <header className="flex items-center justify-between">
        <Label>Assets</Label>
        {!!selected.length && (
          <Button
            type="button"
            size={'sm'}
            variant={'link'}
            className="text-destructive h-fit leading-none"
            onClick={onRemoveAssets}
          >
            Remove
          </Button>
        )}
      </header>
      <div className="w-full h-full flex flex-col gap-2.5">
        <div className="grid grid-cols-4 gap-2">
          {assets.map((asset, i) => {
            return (
              <Fragment key={asset.id}>
                <AssetUploaderItem
                  preview={asset.source}
                  onCheckedChange={value => toggleAsset(value, asset)}
                />
                {isLast(i, assets) && assets.length < max && (
                  <AssetSelector onDone={addSelectedAssets} defaultSelected={assets}>
                    <div className="aspect-square flex items-center justify-center rounded-md border border-dashed hover:border-muted-foreground transition-colors hover:bg-muted">
                      <UploadIcon className="text-muted-foreground" />
                    </div>
                  </AssetSelector>
                )}
              </Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

type Props = {
  /**
   * Function that reacts every time a file or multiple files are uploaded or removed
   */
  onAssetsChange: (files: AssetUploaderAsset[]) => void;
  /**
   * If true, internal file state wont be updated when uploaded
   */
  persistenceMode?: boolean;
  /**
   * an array of default previews to be showed in the component
   */
  defaultAssets: AssetUploaderAsset[];
  max?: number;
};

export const DEFAULT_FILE_ACCEPT = {
  'image/*': []
};

export type AssetUploaderAsset = { id: string; source: string };
