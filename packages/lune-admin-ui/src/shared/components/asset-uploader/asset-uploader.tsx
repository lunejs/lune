import { UploadIcon } from 'lucide-react';
import { Fragment } from 'react/jsx-runtime';
import { type Accept, useDropzone as useReactDropzone } from 'react-dropzone';

import { isLast } from '@lune/common';
import { Button, Label } from '@lune/ui';

import { getPreview } from '@/shared/utils/files.utils';

import { AssetUploaderEmptyState } from './empty-state/asset-uploader-empty-state';
import { AssetUploaderItem } from './item/asset-uploader-item';
import { DropzoneContextProvider, type Preview } from './asset-uploader.context';
import { useDropzone } from './use-asser-uploader';

/**
 * An Asset Uploader component which can manage in memory and persisted files
 *
 * @example
 *
 * <AssetUploader
 *   persistenceMode={!!entity}
 *   previews={entity.assets}
 *   onFilesChange={files => {
 *     if (!entity) {
 *        form.setValue('images', files);
 *        return;
 *      }
 *
 *      uploadImages(entity, files);
 *    }}
 *    onPreviewsRemoved={async previews => {
 *      if (!entity) return;
 *
 *     await removeImages(
 *       entity,
 *       previews.map(p => p.id)
 *     );
 *   }}
 * />
 */
export const AssetUploader = ({
  accept = DEFAULT_FILE_ACCEPT,
  persistenceMode = false,
  onFilesChange,
  onPreviewsRemoved,
  previews,
  max = 50
}: Props) => {
  const {
    files,
    selected,
    previewsSelected,
    addFiles,
    removeFiles,
    toggleFile,
    togglePreview,
    removePreviews
  } = useDropzone(onFilesChange, onPreviewsRemoved, persistenceMode);

  const { getInputProps, getRootProps } = useReactDropzone({
    accept,
    onDrop(acceptedFiles) {
      addFiles(acceptedFiles);
    },
    maxFiles: max
  });

  if (!files.length && !previews?.length) {
    return <AssetUploaderEmptyState inputProps={getInputProps()} rootProps={getRootProps()} />;
  }

  return (
    <DropzoneContextProvider value={{ files, selected, addFiles }}>
      <div className="flex flex-col gap-2">
        <header className="flex items-center justify-between">
          <Label>Assets</Label>
          {!!selected.length && (
            <Button
              type="button"
              size={'sm'}
              variant={'link'}
              className="text-destructive h-fit leading-none"
              onClick={removeFiles}
            >
              Remove
            </Button>
          )}
          {!!previewsSelected.length && (
            <Button
              type="button"
              size={'sm'}
              variant={'link'}
              className="text-destructive h-fit leading-none"
              onClick={() => {
                removePreviews();
              }}
            >
              Remove
            </Button>
          )}
        </header>
        <div className="w-full h-full flex flex-col gap-2.5">
          <div className="grid grid-cols-4 gap-2">
            {previews?.map((preview, i) => {
              return (
                <Fragment key={preview.id}>
                  <AssetUploaderItem
                    preview={preview.source}
                    onCheckedChange={value => {
                      togglePreview(value, preview);
                    }}
                  />
                  {isLast(i, previews) && !files.length && previews.length < max && (
                    <div
                      className="aspect-square flex items-center justify-center rounded-md border border-dashed hover:border-muted-foreground transition-colors hover:bg-muted"
                      {...getRootProps()}
                    >
                      <UploadIcon className="text-muted-foreground" />
                      <input type="file" {...getInputProps()} />
                    </div>
                  )}
                </Fragment>
              );
            })}
            {files.map((file, i) => {
              return (
                <Fragment key={file.file.name}>
                  <AssetUploaderItem
                    preview={getPreview(file.file)}
                    onCheckedChange={value => {
                      toggleFile(value, file);
                    }}
                  />
                  {isLast(i, files) && files.length < max && (
                    <div
                      className="aspect-square flex items-center justify-center rounded-md border border-dashed hover:border-muted-foreground transition-colors hover:bg-muted"
                      {...getRootProps()}
                    >
                      <UploadIcon className="text-muted-foreground" />
                      <input type="file" {...getInputProps()} />
                    </div>
                  )}
                </Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </DropzoneContextProvider>
  );
};

type Props = {
  /**
   * Function that reacts every time a file or multiple files are uploaded or removed
   */
  onFilesChange: (files: File[]) => void;
  /**
   * Function that reacts every time a preview or multiple previews are removed
   */
  onPreviewsRemoved: (previews: Preview[]) => Promise<void> | void;
  /**
   * If true, internal file state wont be updated when uploaded
   */
  persistenceMode?: boolean;
  /**
   * an array of default previews to be showed in the component
   */
  previews?: Preview[];
  accept?: Accept;
  max?: number;
};

export const DEFAULT_FILE_ACCEPT = {
  'image/*': []
};
