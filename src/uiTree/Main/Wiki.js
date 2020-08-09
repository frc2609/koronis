import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';

import ReactMarkdown from 'react-markdown';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';

var store = require('store');
var deepCompare = require('deep-compare');

class Wiki extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wikiData: [],
      displayPage: '',
      redirect: false
    };
  }
  refresh() {
    var wikiData = store.get('wiki/data');
    if(!deepCompare(wikiData, this.state.wikiData) && Array.isArray(wikiData)) {
      this.setState({
        wikiData: wikiData
      });
    }
  }
  componentDidMount() {
    this.refresh();
  }
  componentDidUpdate(prevProps, prevState) {
    if(this.state.redirect) {
      this.setState({redirect: false});
    }
  }
  render() {
    return (
      <>
        {this.state.redirect ?
          <Redirect push to={'/wiki/' + this.state.displayPage} />
        :
          <></>
        }
        <Container maxWidth='xl'>
          <Card>
            <Box my={2} mx={3}>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <List style={{
                    position: 'fixed',
                    zIndex: 1
                  }}>
                    {this.state.wikiData.map((e, i) => {
                      if(e.md.length > 0) {
                        return (
                          <ListItem button key={i} onClick={() => {this.setState({displayPage: e.path.toLowerCase(), redirect: true})}}>
                            <ListItemText primary={e.path.replace('/', ' / ')} />
                          </ListItem>
                        );
                      }
                      return <div key={i}></div>;
                    })}
                  </List>
                  <List>
                    {this.state.wikiData.map((e, i) => {
                      if(e.md.length > 0) { return (<ListItem key={i}><ListItemText primary=' ‏‏‎ ‎' /></ListItem>); }
                      return <div key={i}></div>;
                    })}
                  </List>
                </Grid>
                <Grid item xs={8}>
                  <Route exact path={'/wiki/'}>
                    <Typography>
                      Offline ready KSS Wiki. Data is synced from <a href='https://wiki.koronis.cc/'>wiki.koronis.cc</a>.
                      To get started, click the links on the left menu.
                    </Typography>
                  </Route>
                  {this.state.wikiData.map((e, i) => {
                    return (
                      <Route key={i} exact path={'/wiki/' + e.path.toLowerCase()}>
                        <Breadcrumbs>
                          {e.path.split('/').map((e,i) => {
                            return (
                              <Typography key={i}>{e}</Typography>
                            );
                          })}
                        </Breadcrumbs>
                        <ReactMarkdown source={e.md} />
                      </Route>
                    );
                  })}
                </Grid>
              </Grid>
            </Box>
          </Card>
        </Container>
        <Box mb={3} />
      </>
    );
  }
}

const WikiWithRouter = withRouter(Wiki);
export default WikiWithRouter;
