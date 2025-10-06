import { useState } from 'react';

import type { FileState } from './dropzone.context';

export const useDropzone = (onFilesChange: (files: File[]) => void) => {
  const [files, setFiles] = useState<FileState[]>([]);
  const [selected, setSelected] = useState<FileState[]>([]);

  const addFiles = (files: File[]) => {
    setFiles(prev => {
      const newFiles = [...prev, ...files.map(f => createFileState(f))];

      onFilesChange(newFiles.map(f => f.file));
      return newFiles;
    });
  };

  const removeFiles = () => {
    setFiles(prev => {
      const newFiles = prev.filter(file => !selected.map(({ id }) => id).includes(file.id));

      onFilesChange(newFiles.map(f => f.file));
      return newFiles;
    });
    setSelected([]);
  };

  const toggleFile = (value: boolean, file: FileState) => {
    if (value) {
      setSelected(prev => {
        const newFiles = [...prev, file];

        onFilesChange(newFiles.map(f => f.file));
        return newFiles;
      });
    } else {
      setSelected(prev => {
        const newFiles = prev.filter(_file => _file.id !== file.id);

        onFilesChange(newFiles.map(f => f.file));
        return newFiles;
      });
    }
  };

  return {
    files,
    selected,
    addFiles,
    removeFiles,
    toggleFile
  };
};

const createFileState = (file: File): FileState => {
  return {
    id: crypto.randomUUID(),
    file
  };
};
