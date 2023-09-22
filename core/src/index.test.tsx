import { screen, render } from '@testing-library/react';
import XMLReader from './';

it('renders <XMLReader /> test case', () => {
  render(<XMLReader data-testid="xmlreader" onFileLoaded={(data, iFileInfo, iOriginalFile, text) => {}} />);
  const xmlreader = screen.getByTestId('xmlreader');
  expect(xmlreader.parentElement?.tagName).toBe('DIV');
  expect(xmlreader.tagName).toBe('INPUT');
  expect(xmlreader).toHaveProperty('accept', '.xml, text/xml');
  expect(xmlreader).toHaveProperty('name', 'w-xml-reader-input');
  expect(xmlreader).toHaveProperty('type', 'file');
});
