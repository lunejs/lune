import { useState } from 'react';

import type { FileState } from './dropzone.context';

export const useDropzone = () => {
  const [files, setFiles] = useState<FileState[]>([]);
  const [selected, setSelected] = useState<FileState[]>([]);

  const addFiles = (files: File[]) => {
    setFiles(prev => [...prev, ...files.map(f => createFileState(f))]);
  };

  const removeFiles = () => {
    setFiles(files => files.filter(file => !selected.map(({ id }) => id).includes(file.id)));
    setSelected([]);
  };

  const toggleFile = (value: boolean, file: FileState) => {
    if (value) {
      setSelected(prev => [...prev, file]);
    } else {
      setSelected(prev => prev.filter(_file => _file.id !== file.id));
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
