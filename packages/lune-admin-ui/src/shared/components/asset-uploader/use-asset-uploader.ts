import { useEffect, useState } from 'react';

export const useAssetUploader = (
  onAssetsChange: (files: AssetUploaderAsset[]) => void,
  defaultAssets: AssetUploaderAsset[],
  persistenceMode: boolean,
  max: number
) => {
  const [assets, setAssets] = useState<AssetUploaderAsset[]>(defaultAssets);
  const [selected, setSelected] = useState<AssetUploaderAsset[]>([]);

  useEffect(() => {
    if (!persistenceMode) return;
    setAssets(defaultAssets);
  }, [defaultAssets]);

  const addSelectedAssets = (selectedAssets: AssetUploaderAsset[]) => {
    const newAssets = [...selectedAssets].slice(0, max);
    onAssetsChange(newAssets);

    if (persistenceMode) return;

    setAssets(newAssets);
  };

  const toggleAsset = (value: boolean, file: AssetUploaderAsset) => {
    if (value) {
      const newAssets = [...selected, file];

      setSelected(newAssets);
    } else {
      const newFiles = selected.filter(_file => _file.id !== file.id);

      setSelected(newFiles);
    }
  };

  const onRemoveAssets = () => {
    const idsToRemove = selected.map(s => s.id);
    const newAssets = assets.filter(asset => !idsToRemove.includes(asset.id));

    onAssetsChange(newAssets);
    setSelected([]);

    if (persistenceMode) return;

    setAssets(newAssets);
  };

  return {
    assets,
    selected,
    addSelectedAssets,
    toggleAsset,
    onRemoveAssets
  };
};

type AssetUploaderAsset = { id: string; source: string };
