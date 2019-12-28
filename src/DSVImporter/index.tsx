import React from 'react';
import ReactDOM from 'react-dom';
import DSVImporter from './DSVImporter';
import 'semantic-ui-css/semantic.min.css';

export default DSVImporter;

export function createDSVImporter(node: HTMLElement) {
  ReactDOM.render(<DSVImporter />, node);
}
