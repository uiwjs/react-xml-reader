import { CSSProperties, useState } from 'react';
import XMLReader from '@uiw/react-xml-reader';
import JsonView from '@uiw/react-json-view';
import { lightTheme } from '@uiw/react-json-view/light';
import { styled } from "goober";

const Examples = styled('div')`
  text-align: left;
  display: inline-block;
`;

export default function App() {
  const [value, setValue] = useState<any>();
  return (
    <Examples>
      <XMLReader
        parserOptions={{
        }}
        onFileLoaded={async (data, iFileInfo, iOriginalFile, text) => {
          setValue(data);
          const txt = await iOriginalFile?.text()
          console.log('data:', data, iFileInfo, iOriginalFile, txt)
        }}
      />
      {value && (
        <JsonView
          keyName="data"
          value={value}
          collapsed={false}
          style={lightTheme as CSSProperties}
        />
      )}
    </Examples>
  );
}
