import { type Context, createContext, type ReactElement, use } from 'react';

export type Preview = { id: string; source: string };

export type FileState = {
  id: `${string}-${string}-${string}-${string}-${string}`;
  file: File;
};

type Schema = {
  files: FileState[];
  selected: FileState[];

  addFiles: (files: File[]) => void;
};

const Context = createContext<Schema>({
  files: [],
  selected: [],
  addFiles: () => undefined
});

export const DropzoneContextProvider = ({ children, value }: Props) => {
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

type Props = {
  children: ReactElement;
  value: Schema;
};

export const useDropzoneContext = () => use(Context);
