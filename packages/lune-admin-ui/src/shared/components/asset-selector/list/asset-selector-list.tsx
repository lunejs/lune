import { type Dispatch, type SetStateAction, useEffect, useState } from 'react';
import { UploadCloudIcon } from 'lucide-react';
import { useDebouncedCallback } from 'use-debounce';

import {
  Button,
  Checkbox,
  cn,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  Muted,
  P,
  useTheme
} from '@lune/ui';

import type { CommonAssetFragment } from '@/lib/api/types';
import { useGetAssets } from '@/lib/asset/hooks/use-get-assets';
import { useUploadAsset } from '@/lib/asset/hooks/use-upload-asset';
import { useScrolled } from '@/shared/hooks/use-scrolled';
import { TYPING_DEBOUNCE_DELAY } from '@/shared/utils/constants.utils';

import { Dropzone } from '../../dropzone/dropzone';
import { SpinnerLoader } from '../../loader/spinner-loader';
import { AssetSelectorEmptyState } from '../empty-state/asset-selector-empty-state';
import { AssetSelectorNoMatchingFiltersState } from '../empty-state/asset-selector-no-matching-filters-state';

export const AssetSelectorList = ({ selected, setSelected }: Props) => {
  const { theme } = useTheme();
  const [ref, isScrolled] = useScrolled<HTMLDivElement>();
  const [query, setQuery] = useState('');

  const { isUploading, uploadAsset } = useUploadAsset();
  const { isLoading, isRefetching, refetch, assets } = useGetAssets({
    filters: {
      ...(query && { filename: { contains: query } })
    }
  });

  const hasActiveFilters = !!query;
  const noAssetsInDb = !isLoading && !assets.length && !hasActiveFilters;

  useEffect(() => {
    refetch();
  }, [query]);

  const onQueryChange = useDebouncedCallback(setQuery, TYPING_DEBOUNCE_DELAY);

  const onSelect = (asset: CommonAssetFragment, value: boolean | string) => {
    if (typeof value === 'string') return;

    if (value) {
      setSelected(prev => [...prev, asset]);
      return;
    }

    setSelected(prev => prev.filter(a => a.id !== asset.id));
  };

  return (
    <div className="flex flex-col h-full max-h-[calc(100%-129px-58px)] sm:max-h-[calc(100%-85px-58px)]">
      {noAssetsInDb ? (
        <AssetSelectorEmptyState />
      ) : (
        <>
          <div
            className={cn(
              'flex items-center justify-between gap-3 pb-6 px-6 z-10 h-fit border border-transparent',
              isScrolled && theme === 'light' && 'shadow-sm',
              isScrolled && theme === 'dark' && 'border-b-border'
            )}
          >
            <InputGroup className="max-w-80 w-full">
              <InputGroupInput
                placeholder="Search by filename or ext"
                onChange={e => onQueryChange(e.target.value)}
              />
              <InputGroupAddon
                align="inline-end"
                className={cn('opacity-0 transition-all', isRefetching && 'opacity-100')}
              >
                <SpinnerLoader />
              </InputGroupAddon>
            </InputGroup>
            <Dropzone onDrop={acceptedFiles => uploadAsset(acceptedFiles)}>
              <Button isLoading={isUploading} variant={'outline'} className="shrink-0">
                {!isUploading && <UploadCloudIcon />} Upload
              </Button>
            </Dropzone>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div
              ref={ref}
              className="grid grid-cols-2 justify-center h-fit gap-4 pb-4 px-6 md:grid-cols-4 lg:grid-cols-6"
            >
              {isLoading && <SpinnerLoader />}

              {assets.map(asset => (
                <article key={asset.id} className="flex flex-col items-center">
                  <label
                    htmlFor={asset.id}
                    className="flex items-center justify-center relative w-full aspect-square overflow-hidden rounded-lg bg-card border-4 group"
                  >
                    <Checkbox
                      id={asset.id}
                      className="absolute top-2 left-2 dark:bg-background"
                      checked={selected.some(s => s.id === asset.id)}
                      onCheckedChange={value => {
                        onSelect(asset, value);
                      }}
                    />
                    <div className="w-full h-full absolute group-hover:bg-black/30" />
                    <img
                      loading="lazy"
                      src={asset.source}
                      alt={asset.filename}
                      className="max-h-full"
                    />
                  </label>

                  <P
                    className="mt-2 block w-full truncate text-center text-sm"
                    title={asset.filename}
                  >
                    {asset.filename}
                  </P>
                  <Muted>{asset.ext}</Muted>
                </article>
              ))}

              {!isLoading && !assets.length && hasActiveFilters && (
                <AssetSelectorNoMatchingFiltersState />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

type Props = {
  selected: SelectedAsset[];
  setSelected: Dispatch<SetStateAction<SelectedAsset[]>>;
};

type SelectedAsset = { id: string; source: string };
