import React from 'react';
import ReactDOM from 'react-dom';
import DSVImporter from './DSVImporter';
import 'typeface-roboto';

export default DSVImporter;

export function createDSVImporter(node: HTMLElement) {
  ReactDOM.render(<DSVImporter />, node);
}
