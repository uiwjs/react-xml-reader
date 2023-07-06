import { forwardRef } from 'react';
import { XMLParser, X2jOptionsOptional } from 'fast-xml-parser';

export interface IFileInfo {
  name: string;
  size: number;
  type: string;
  modifiedAt: number;
}

export interface XMLReaderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onError'> {
  strict?: boolean;
  encoding?: string;
  parserOptions?: X2jOptionsOptional;
  onError?: (error: Error) => void;
  onFileLoaded: (data: unknown, fileInfo: IFileInfo, originalFile: File, text: string) => void;
}

const XMLReader = forwardRef<HTMLInputElement, XMLReaderProps>((props, ref) => {
  const { 
    accept = '.xml, text/xml',
    encoding = 'UTF-8',
    onError = () => {},
    parserOptions = {},
    onFileLoaded,
    onChange,
    strict = false,
    ...reset
  } = props;
  const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(event);
    let reader: FileReader = new FileReader()
    const files: FileList = event.target.files!
    if (files.length > 0) {
      const fileInfo: IFileInfo = {
        name: files[0].name,
        size: files[0].size,
        type: files[0].type,
        modifiedAt: files[0].lastModified,
      }

      if (strict && accept.indexOf(fileInfo.type) <= 0) {
        onError(new Error(`[strict mode] Accept type not respected: got '${fileInfo.type}' but not in '${accept}'`))
        return
      }

      reader.onload = (_event: Event) => {
        const parser = new XMLParser(parserOptions);
        const xmlData = parser.parse(reader.result as string);
        onFileLoaded && onFileLoaded(xmlData || {}, fileInfo, files[0], reader.result as string);
      }

      reader.readAsText(files[0], encoding)
    }
  }
  return (
    <input type="file" name="w-xml-reader-input" {...reset} onChange={handleChangeFile} accept={accept} ref={ref} />
  );
});

export default XMLReader;