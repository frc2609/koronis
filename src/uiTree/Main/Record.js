import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';

import * as Interface from 'db/Interface';

import Paper from '@material-ui/core/Paper';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Box from '@material-ui/core/Box';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import FolderIcon from '@material-ui/icons/Folder';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';

import RecordView from 'uiTree/components/Record/RecordView';
import RecordQueryBar from 'uiTree/components/Record/RecordQueryBar';
import RecordEngine from 'engine/record/RecordEngine';

class Record extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 'view',
      loading: true,
      records: []
    };
    this.queryObj = {};
    this.recordsSubscription = null;
    this.routeHandler = this.routeHandler.bind(this);
    window.addEventListener('hashchange', this.routeHandler);
  }
  refresh() {
    this.setState({loading: true, records: []});
    if(typeof this.refs.recordQueryBar !== 'undefined') {
      this.queryObj = this.refs.recordQueryBar.getQueryObj();
    }
    if(this.recordsSubscription !== null) {
      this.recordsSubscription.unsubscribe();
    }
    Interface.subscribeRecords(this.queryObj, {lastModified: 'desc'}, (docs) => {
      this.setState({records: docs, loading: false});
    }).then((subscription) => {
      this.recordsSubscription = subscription;
    });
  }
  routeHandler() {
    if(typeof this.props.location !== 'undefined' && typeof this.props.location.pathname === 'string' && this.props.location.pathname.includes('/record')) {
      if(this.props.location.pathname.includes('/record/record')) {
        this.setState({ tab: 'record', redirect: false });
      }
      else {
        this.setState({ tab: 'view', redirect: false }); 
      }
    }
  }
  tabHandler(event, value) {
    this.setState({tab: value, redirect: true});
  }
  componentDidMount() {
    this.refresh();
    this.routeHandler();
  }
  componentDidUpdate(prevProps) {
    if(prevProps.queryObj !== this.props.queryObj) {
      this.refresh();
    }
    if(this.state.redirect) {
      this.setState({redirect: false});
    }
  }
  componentWillUnmount() {
    if(this.recordsSubscription !== null) {
      this.recordsSubscription.unsubscribe();
    }
    window.removeEventListener('hashchange', this.routeHandler);
  }
  render() {
    return (
      <>
        {this.state.redirect ?
          <Redirect push to={'/record/' + this.state.tab} />
        :
          <></>
        }
        <Route exact path='/record'><Redirect push to='/record/view' /></Route>
        <Route path='/record/view'>
          <Container maxWidth='xl'>
            <RecordQueryBar ref='recordQueryBar' name='record' button onSubmit={this.refresh.bind(this)}/>
            {this.state.loading ?
              <Box display='flex'> 
                <Box mx='auto'>
                  <CircularProgress />
                </Box>
              </Box>
            :
              <RecordView records={this.state.records} onRemove={this.refresh.bind(this)} />
            }
          </Container>
        </Route>
        <Route path='/record/record'>
          <RecordEngine onClose={() => {this.setState({tab: 'view', redirect: true})}}/>
        </Route>
        {this.state.tab !== 'record' ?
          <Paper
            square
            elevation={4}
            style={{
              position: 'fixed',
              bottom: '0px',
              width: '100%',
              zIndex: 100
            }}
          >
            <BottomNavigation
              value={this.state.tab}
              onChange={this.tabHandler.bind(this)}
            >
              <BottomNavigationAction label='View' value='view' icon={<FolderIcon />} />
              <BottomNavigationAction label='Record' value='record' icon={<FiberManualRecordIcon />} />
            </BottomNavigation>
          </Paper>
        :
         <></>
        }
      </>
    );
  }
}

const RecordWithRouter = withRouter(Record);
export default RecordWithRouter;
