import { useState } from 'react';

import type { FileState, Preview } from './dropzone.context';

export const useDropzone = (
  onFilesChange: (files: File[]) => void,
  onPreviewsRemoved: (previews: Preview[]) => Promise<void> | void,
  persistenceMode: boolean
) => {
  const [files, setFiles] = useState<FileState[]>([]);
  const [selected, setSelected] = useState<FileState[]>([]);
  const [previewsSelected, setPreviewsSelected] = useState<Preview[]>([]);

  const addFiles = (filesParam: File[]) => {
    const newFiles = [...files, ...filesParam.map(f => createFileState(f))];

    onFilesChange(newFiles.map(f => f.file));

    if (persistenceMode) return;

    setFiles(newFiles);
  };

  const removeFiles = () => {
    const newFiles = files.filter(file => !selected.map(({ id }) => id).includes(file.id));

    onFilesChange(newFiles.map(f => f.file));
    setFiles(newFiles);
    setSelected([]);
  };

  const removePreviews = async () => {
    await onPreviewsRemoved(previewsSelected);
    setPreviewsSelected([]);
  };

  const toggleFile = (value: boolean, file: FileState) => {
    if (value) {
      const newFiles = [...selected, file];

      onFilesChange(newFiles.map(f => f.file));
      setSelected(newFiles);
    } else {
      const newFiles = files.filter(_file => _file.id !== file.id);

      onFilesChange(newFiles.map(f => f.file));
      setSelected(newFiles);
    }
  };

  const togglePreview = (value: boolean, preview: Preview) => {
    if (value) {
      setPreviewsSelected(prev => [...prev, preview]);
    } else {
      setSelected(prev => prev.filter(_file => _file.id !== preview.id));
    }
  };

  return {
    files,
    selected,
    previewsSelected,
    addFiles,
    removeFiles,
    removePreviews,
    toggleFile,
    togglePreview
  };
};

const createFileState = (file: File): FileState => {
  return {
    id: crypto.randomUUID(),
    file
  };
};
