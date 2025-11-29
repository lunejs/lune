import { cloneElement, isValidElement, type ReactElement } from 'react';
import { type Accept, useDropzone } from 'react-dropzone';

import { DEFAULT_FILE_ACCEPT } from '../asset-uploader/asset-uploader';

/**
 * @description
 * A wrapper around `react-dropzone` providing minimal but practical api for uploading assets in lune
 *
 * @param onDrop Function that reacts every time a file or multiple files are dropped
 * @param accept type of file that file input accepts
 * @param disabled weather the input is disabled or not
 */
export const Dropzone = ({ onDrop, children, accept = DEFAULT_FILE_ACCEPT, disabled }: Props) => {
  const { getRootProps, getInputProps } = useDropzone({
    onDropAccepted: onDrop,
    accept,
    disabled
  });

  if (!isValidElement(children)) return;

  return cloneElement(
    children,
    { ...getRootProps() },
    <>
      {(children.props as any).children}
      <input {...getInputProps()} type="file" className="hidden" />
    </>
  );

  // return (
  //   <div className={cn('shrink-0 h-12 w-12', className)}>
  //     <div
  //       className={cn(
  //         'rounded-sm border border-dashed cursor-pointer flex items-center justify-center w-full h-full hover:border-muted-foreground hover:bg-muted transition-colors',
  //         disabled && 'pointer-events-none opacity-30'
  //       )}
  //       {...getRootProps()}
  //     >
  //       <input {...getInputProps()} type="file" className="hidden" disabled={disabled} />
  //       <UploadIcon size={iconSize} />
  //     </div>
  //   </div>
  // );
};

type Props = {
  /**
   * Function that reacts every time a file or multiple files are dropped
   */
  onDrop: (acceptedFiles: File[]) => void;
  children: ReactElement;
  accept?: Accept;
  disabled?: boolean;
};
