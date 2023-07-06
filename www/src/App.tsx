import GitHubCorners from '@uiw/react-github-corners';
import XMLReader from '@uiw/react-xml-reader';
import JsonView from '@uiw/react-json-view';
import { lightTheme } from '@uiw/react-json-view/light';
import BackToUp from '@uiw/react-back-to-top';
import { styled } from "goober";
import { CSSProperties, useState } from 'react';
import MarkdownPreview from './Markdown';

const Header = styled('header')`
  padding: 2rem 0;
  text-align: center;
  h1 {
    font-weight: 900;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif,
      'Apple Color Emoji', 'Segoe UI Emoji';
  }
`;

const SupVersion = styled('sup')`
  font-weight: 200;
  font-size: 0.78rem;
  margin-left: 0.5em;
  margin-top: -0.3em;
  position: absolute;
`;

const Wrappper = styled('div')`
  padding-bottom: 5rem;
`;

const Examples = styled('div')`
  text-align: left;
  display: inline-block;
`;

export default function App() {
  const [value, setValue] = useState<any>();
  return (
    <Wrappper>
      <GitHubCorners fixed target="__blank" zIndex={10} href="https://github.com/uiwjs/react-xml-reader" />
      <Header>
        <h1>
        XML Reader for React<SupVersion>v{VERSION}</SupVersion>
        </h1>
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
      </Header>
      <MarkdownPreview />
      <BackToUp>Top</BackToUp>
    </Wrappper>
  );
}
