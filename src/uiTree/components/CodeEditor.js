import React from 'react';

import Box from '@material-ui/core/Box';

import {Controlled as CodeMirror} from 'react-codemirror2';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/lib/codemirror.css';
import 'codemirror/addon/search/search.js';
import 'codemirror/addon/edit/matchbrackets.js';
import 'codemirror/addon/edit/closebrackets.js';
import 'codemirror/addon/fold/foldgutter.css';
import 'codemirror/addon/fold/foldgutter.js';
import 'codemirror/addon/fold/brace-fold.js';

import 'uiTree/components/CodeEditor.css';

export default class CodeEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currStr: typeof this.props.value === 'undefined' ? '' : this.props.value
    }
  }
  getValue() {
    return this.state.currStr;
  }
  componentDidUpdate(prevProps, prevState) {
    if(prevProps.value !== this.props.value && typeof this.props.value !== 'undefined') {
      this.setState({currStr: this.props.value});
    }
  }
  render() {
    return (
      <Box display='flex' mb={3} height='100%' border={1} borderColor='grey.500' textAlign='left'>
        <CodeMirror
          ref='codeMirror'
          autoScroll
          value={this.state.currStr}
          onBeforeChange={(editor, data, value) => {this.setState({currStr: value})}}
          onChange={(editor, data, value) => {if(typeof this.props.onChange === 'function') {this.props.onChange(value)}}}
          onKeyDown={(editor, event) => {
            if(event.which === 83 && event.ctrlKey) {
              event.preventDefault();
              if(event.shiftKey) {
                if(typeof this.props.onSaveNew === 'function') {this.props.onSaveNew()}
              }
              else {
                if(typeof this.props.onSave === 'function') {this.props.onSave()}
              }
            }
            else if(event.which === 78 && event.ctrlKey) {
              event.preventDefault();
              if(typeof this.props.onNew === 'function') {this.props.onNew()}
            }
            else if(event.which === 79 && event.ctrlKey) {
              event.preventDefault();
              if(typeof this.props.onOpen === 'function') {this.props.onOpen()}
            }
          }}
          options={{
            mode: 'javascript',
            matchBrackets: true,
            autoCloseBrackets: true,
            foldGutter: true,
            gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
            tabSize: 2,
            lineNumbers: true,
            lineWrapping: false
          }}
        />
      </Box>
    );
  }
}
