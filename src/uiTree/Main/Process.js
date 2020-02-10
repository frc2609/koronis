import React from 'react';

import * as Interface from 'db/Interface';

import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import CodeEditor from 'uiTree/components/CodeEditor';
import ProcessCreationBar from 'uiTree/Main/Process/ProcessCreationBar';

export default class Process extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 'editing'
    }
  }
  tabHandler(event, value) {
    this.setState({tab: value});
  }
  render() {
    return (
      <Container>
        <Card>
          <Tabs
        value={this.state.tab}
        onChange={this.tabHandler.bind(this)}
        indicatorColor='primary'
        textColor='primary'
        variant='fullWidth'
        style={{marginBottom: '4vh'}}
          >
            <Tab label='Edit' value='editing' />
            <Tab label='Test' value='testing' />
          </Tabs>
          {
            this.state.tab === 'editing' ?
            <>
              <ProcessCreationBar/>
              <Container>
                <CodeEditor />
              </Container>
            </>
            : this.state.tab === 'testing' ?
            <>
            </>
            :
            <>
            </>
          }
        </Card>
      </Container>
    );
  }
}
