import { UploadIcon } from 'lucide-react';
import { type Accept, useDropzone } from 'react-dropzone';

import { cn } from '@lune/ui';

import { DEFAULT_FILE_ACCEPT } from '../asset-uploader/asset-uploader';

const DEFAULT_ICON_SIZE = 16;

export const Dropzone = ({
  onDrop,
  accept = DEFAULT_FILE_ACCEPT,
  iconSize = DEFAULT_ICON_SIZE,
  disabled,
  className
}: Props) => {
  const { getRootProps, getInputProps } = useDropzone({
    onDropAccepted: onDrop,
    accept,
    disabled
  });

  return (
    <div className={cn('shrink-0 h-12 w-12', className)}>
      <div
        className={cn(
          'rounded-sm border border-dashed cursor-pointer flex items-center justify-center w-full h-full hover:border-muted-foreground hover:bg-muted transition-colors',
          disabled && 'pointer-events-none opacity-30'
        )}
        {...getRootProps()}
      >
        <input {...getInputProps()} type="file" className="hidden" disabled={disabled} />
        <UploadIcon size={iconSize} />
      </div>
    </div>
  );
};

type Props = {
  /**
   * Function that reacts every time a file or multiple files are dropped
   */
  onDrop: (acceptedFiles: File[]) => void;
  iconSize?: number;
  className?: string;
  accept?: Accept;
  disabled?: boolean;
};
