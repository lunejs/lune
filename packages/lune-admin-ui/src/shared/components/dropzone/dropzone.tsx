import { cloneElement, isValidElement, type ReactElement } from 'react';
import { type Accept, useDropzone } from 'react-dropzone';

import { DEFAULT_FILE_ACCEPT } from '../asset-uploader/asset-uploader';

/**
 * @description
 * A wrapper around `react-dropzone` that enhances any child element with drag-and-drop file upload capabilities.
 *
 * @param onDrop - Callback invoked when files are successfully dropped or selected. Only valid files matching the `accept` criteria are passed.
 * @param children - A single React element that will be enhanced with dropzone functionality. Must be a valid React element.
 * @param accept - File type restrictions following the HTML accept attribute format. Defaults to `{'image/*': []}` (all image types).
 * @param disabled - When true, prevents file selection and drag-and-drop interactions.
 *
 * @example
 * <Dropzone onDrop={(files) => uploadFiles(files)}>
 *   <div className="border-dashed border-2 p-4">
 *     Drop files here or click to select
 *   </div>
 * </Dropzone>
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
   * Callback invoked when files are successfully dropped or selected through the file dialog.
   * Only receives files that pass the validation criteria specified in the `accept` prop.
   * Rejected files (wrong type, too large, etc.) are automatically filtered out by react-dropzone.
   *
   * @param acceptedFiles - Array of File objects that passed validation
   */
  onDrop: (acceptedFiles: File[]) => void;

  /**
   * A single valid React element that will be enhanced with dropzone functionality.
   * The component clones this element and injects drag-and-drop props while preserving
   * its original appearance and behavior.
   *
   * @example
   * <Dropzone onDrop={handleDrop}>
   *   <Button>Upload Files</Button>
   * </Dropzone>
   */
  children: ReactElement;

  /**
   * File type restrictions using the react-dropzone Accept format.
   * Specifies which file MIME types and extensions are allowed.
   *
   * @default { 'image/*': [] } - Accepts all image types
   *
   * @example
   * // Accept only PNG and JPEG images
   * accept={{ 'image/png': ['.png'], 'image/jpeg': ['.jpg', '.jpeg'] }}
   *
   * @example
   * // Accept PDFs and Word documents
   * accept={{
   *   'application/pdf': ['.pdf'],
   *   'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
   * }}
   */
  accept?: Accept;

  /**
   * When true, disables all dropzone functionality including drag-and-drop and click-to-select.
   * Useful during upload operations or when the component should be temporarily inactive.
   *
   * @default false
   */
  disabled?: boolean;
};
