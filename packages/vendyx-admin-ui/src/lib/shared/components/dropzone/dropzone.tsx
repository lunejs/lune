import { UploadIcon } from 'lucide-react';
import { Fragment } from 'react/jsx-runtime';
import { type Accept, useDropzone as useReactDropzone } from 'react-dropzone';

import { Button, Label } from '@vendyx/ui';

import { isLast } from '../../utils/arrays.utils';
import { getPreview } from '../../utils/files.utils';

import { DropzoneEmptyState } from './empty-state/dropzone-empty-state';
import { DropzoneItem } from './item/dropzone-item';
import { DropzoneContextProvider, type Preview } from './dropzone.context';
import { useDropzone } from './use-dropzone';

const DEFAULT_ACCEPT = {
  'image/*': []
};

export const Dropzone = ({
  accept = DEFAULT_ACCEPT,
  persistenceMode = false,
  onFilesChange,
  onPreviewsRemoved,
  previews
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
    }
  });

  if (!files.length && !previews?.length) {
    return <DropzoneEmptyState inputProps={getInputProps()} rootProps={getRootProps()} />;
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
        <div className="w-full h-full flex flex-col gap-[10px]">
          <div className="grid grid-cols-4 gap-2">
            {previews?.map((preview, i) => {
              return (
                <Fragment key={preview.id}>
                  <DropzoneItem
                    preview={preview.source}
                    onCheckedChange={value => {
                      togglePreview(value, preview);
                    }}
                  />
                  {isLast(i, previews) && !files.length && (
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
                <>
                  <DropzoneItem
                    key={file.file.name}
                    preview={getPreview(file.file)}
                    onCheckedChange={value => {
                      toggleFile(value, file);
                    }}
                  />
                  {isLast(i, files) && (
                    <div
                      className="aspect-square flex items-center justify-center rounded-md border border-dashed hover:border-muted-foreground transition-colors hover:bg-muted"
                      {...getRootProps()}
                    >
                      <UploadIcon className="text-muted-foreground" />
                      <input type="file" {...getInputProps()} />
                    </div>
                  )}
                </>
              );
            })}
          </div>
        </div>
      </div>
    </DropzoneContextProvider>
  );
};

type Props = {
  onFilesChange: (files: File[]) => void;
  onPreviewsRemoved: (previews: Preview[]) => Promise<void> | void;
  persistenceMode?: boolean;
  accept?: Accept;
  previews?: Preview[];
};
