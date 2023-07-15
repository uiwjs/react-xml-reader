react-xml-reader
===

[![CI](https://github.com/uiwjs/react-xml-reader/actions/workflows/ci.yml/badge.svg)](https://github.com/uiwjs/react-xml-reader/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/@uiw/react-xml-reader.svg)](https://www.npmjs.com/package/@uiw/react-xml-reader)
[![NPM Downloads](https://img.shields.io/npm/dm/@uiw/react-xml-reader.svg?style=flat&label=)](https://www.npmjs.com/package/@uiw/react-xml-reader)

React component that handles **`xml`** file input and its parsing. <!--rehype:ignore:start-->Example Preview: [uiwjs.github.io/react-xml-reader](https://uiwjs.github.io/react-xml-reader/)<!--rehype:ignore:end-->

## Quick Start

```bash
npm install @uiw/react-xml-reader
```

```jsx
import XMLReader from '@uiw/react-xml-reader';

<XMLReader
  onFileLoaded={(data, iFileInfo, iOriginalFile, text) => { }}
/>
```

## Example

```tsx mdx:preview
import React, { useState } from 'react';
import XMLReader from '@uiw/react-xml-reader';
import JsonView from '@uiw/react-json-view';
import { lightTheme } from '@uiw/react-json-view/light';

export default function Demo() {
  const [value, setValue] = useState();
  return (
    <React.Fragment>
      <XMLReader
        onFileLoaded={(data, iFileInfo, iOriginalFile, text) => {
          setValue(data);
        }}
      />
      {value && (
        <JsonView
          keyName="data"
          value={value}
          collapsed={false}
          style={lightTheme}
        />
      )}
    </React.Fragment>
  );
}
```

**parserOptions**

```tsx mdx:preview
import React, { useState } from 'react';
import XMLReader from '@uiw/react-xml-reader';
import JsonView from '@uiw/react-json-view';
import { lightTheme } from '@uiw/react-json-view/light';
import { darkTheme } from '@uiw/react-json-view/dark';

export default function Demo() {
  const [parserOptions, setParserOptions] = useState({
    trimValues: true,
    parseCDATA: true,
    ignoreAttributes: true,
    parseNodeValue: true,
    removeNSPrefix: true,
    leadingZeros: true,
  });
  const [value, setValue] = useState();
  const [fileInfo, setFileInfo] = useState();
  const [originalFile, setOriginalFile] = useState();

  const change = (evn) => {
    const opt = { [evn.target.id]: evn.target.checked }
    if (evn.target.id === 'ignoreAttributes' && opt.ignoreAttributes) {
      opt.attributesGroupName = false;
      opt.allowBooleanAttributes = false;
      opt.parseAttributeValue = false;
    }
    
    setParserOptions({ ...parserOptions, ...opt });
  }
  return (
    <React.Fragment>
      <XMLReader
        parserOptions={parserOptions}
        onFileLoaded={(data, iFileInfo, iOriginalFile) => {
          setValue(data);
          setFileInfo(iFileInfo);
          const fileData = {};
          for (let file in iOriginalFile) {
            fileData[file] = iOriginalFile[file];
          }
          setOriginalFile(fileData);
        }}
      />
      <div style={{ background: '#fff', padding: 10 }}>
        <label>
          <input type="checkbox" id="preserveOrder" checked={!!parserOptions.preserveOrder} onChange={change} /> Preserve Order
        </label>
        <br />
        <label>
          <input type="checkbox" id="parseCDATA" checked={!!parserOptions.parseCDATA} onChange={change} /> Parse CDATA as separate property
        </label>
        <br />
        <label>
          <input type="checkbox" id="alwaysCreateTextNode" checked={!!parserOptions.alwaysCreateTextNode} onChange={change} /> Always create a separate property for text value of a tag.
        </label>
        <br />
        <label>
          <input type="checkbox" id="trimValues" checked={!!parserOptions.trimValues} onChange={change} /> Trim
        </label>
        <br />
        <label>
          <input type="checkbox" id="ignoreAttributes" checked={!!parserOptions.ignoreAttributes} onChange={change} /> Ignore attributes
        </label>
        <br />
        <label style={{ paddingLeft: 10 }}>
          <input type="checkbox" id="attributesGroupName" disabled={!!parserOptions.ignoreAttributes} checked={!!parserOptions.attributesGroupName} onChange={change} /> Group all the attributes
        </label>
        <br />
        <label style={{ paddingLeft: 10 }}>
          <input type="checkbox" id="allowBooleanAttributes" disabled={!!parserOptions.ignoreAttributes} checked={!!parserOptions.allowBooleanAttributes} onChange={change} /> Allow Boolean Attributes
        </label>
        <br />
        <label style={{ paddingLeft: 10 }}>
          <input type="checkbox" id="parseAttributeValue" disabled={!!parserOptions.ignoreAttributes} checked={!!parserOptions.parseAttributeValue} onChange={change} /> Parse attribute's value to float / integer / boolean.
        </label>
        <br />
        <label>
          <input type="checkbox" id="parseNodeValue" checked={!!parserOptions.parseNodeValue} onChange={change} /> Parse text-node's value to float / integer / boolean.
        </label>
        <br />
        <label>
          <input type="checkbox" id="removeNSPrefix" checked={!!parserOptions.removeNSPrefix} onChange={change} /> Remove namespace string from tag and attribute names.
        </label>
        <br />
        <label>
          <input type="checkbox" id="leadingZeros" checked={!!parserOptions.leadingZeros} onChange={change} /> Parse Number with leading zeros
        </label>
      </div>

      {value && <JsonView keyName="data" value={value} collapsed={false} style={lightTheme} />}
      {fileInfo && <JsonView keyName="fileInfo" value={fileInfo} collapsed={false} style={darkTheme} />}
      {originalFile && <JsonView keyName="new File()" value={Object.assign(originalFile)} collapsed={false} style={lightTheme} />}
    </React.Fragment>
  );
}
```

**Get xml raw text content**

The original text can also be obtained using `await iOriginalFile.text()`.

```tsx mdx:preview
import React, { useState } from 'react';
import XMLReader from '@uiw/react-xml-reader';
import JsonView from '@uiw/react-json-view';
import { lightTheme } from '@uiw/react-json-view/light';

export default function Demo() {
  const [value, setValue] = useState('');
  return (
    <React.Fragment>
      <XMLReader
        onFileLoaded={(data, iFileInfo, iOriginalFile, text) => {
          setValue(text);
        }}
      />
      {value && value.length > 0 && (
        <pre>{value}</pre>
      )}
    </React.Fragment>
  );
}
```

## Props

```ts
import { X2jOptionsOptional } from 'fast-xml-parser';
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
  onFileLoaded: (data: any, fileInfo: IFileInfo, originalFile: File, text: string) => void;
}
declare const XMLReader: import("react").ForwardRefExoticComponent<XMLReaderProps & import("react").RefAttributes<HTMLInputElement>>;
export default XMLReader;
```

```ts
type X2jOptionsOptional = Partial<X2jOptions>;
type X2jOptions = {
  preserveOrder: boolean;
  attributeNamePrefix: string;
  attributesGroupName: false | string;
  textNodeName: string;
  ignoreAttributes: boolean;
  removeNSPrefix: boolean;
  allowBooleanAttributes: boolean;
  parseTagValue: boolean;
  parseAttributeValue: boolean;
  trimValues: boolean;
  cdataPropName: false | string;
  commentPropName: false | string;
  /**
   * Control how tag value should be parsed. Called only if tag value is not empty
   * @returns {undefined|null} `undefined` or `null` to set original value.
   * @returns {unknown} 
   * 1. Different value or value with different data type to set new value. <br>
   * 2. Same value to set parsed value if `parseTagValue: true`.
   */
  tagValueProcessor: (tagName: string, tagValue: string, jPath: string, hasAttributes: boolean, isLeafNode: boolean) => unknown;
  attributeValueProcessor: (attrName: string, attrValue: string, jPath: string) => unknown;
  numberParseOptions: strnumOptions;
  stopNodes: string[];
  unpairedTags: string[];
  alwaysCreateTextNode: boolean;
  isArray: (tagName: string, jPath: string, isLeafNode: boolean, isAttribute: boolean) => boolean;
  processEntities: boolean;
  htmlEntities: boolean;
  ignoreDeclaration: boolean;
  ignorePiTags: boolean;
  transformTagName: ((tagName: string) => string) | false;
  transformAttributeName: ((attributeName: string) => string) | false;
  /**
   * Change the tag name when a different name is returned. Skip the tag from parsed result when false is returned. 
   * Modify `attrs` object to control attributes for the given tag.
   * @returns {string} new tag name.
   * @returns false to skip the tag
   */
  updateTag: (tagName: string, jPath: string, attrs: {[k: string]: string}) =>  string | boolean;
}
```

## Development

Runs the project in development mode.  

```bash
# Step 1, run first, listen to the component compile and output the .js file
# listen for compilation output type .d.ts file
npm run watch
# Step 2, development mode, listen to compile preview website instance
npm run start
```

Builds the app for production to the build folder.

```bash
npm run build
```

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

## Related

- [@uiw/react-csv-reader](https://uiwjs.github.io/react-csv-reader) React component that handles csv file input and its parsing.

## Contributors

As always, thanks to our amazing contributors!

<a href="https://github.com/uiwjs/react-xml-reader/graphs/contributors">
  <img src="https://uiwjs.github.io/react-xml-reader/CONTRIBUTORS.svg" />
</a>

Made with [action-contributors](https://github.com/jaywcjlove/github-action-contributors).

## License

Licensed under the MIT License.
