import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';

import ReactMarkdown from 'react-markdown';

import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Popover from '@material-ui/core/Popover';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import ListIcon from '@material-ui/icons/List';

import Config from 'config/Config';
import WikiNavBar from 'uiTree/Main/Wiki/WikiNavBar';

const store = require('store');
const deepCompare = require('fast-deep-equal');
const moment = require('moment');

class Wiki extends React.Component {
  cardRef = React.createRef();
  menuButtonRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      wikiData: [],
      displayPage: '',
      redirect: false,
      openMenu: false
    };
  }
  refresh() {
    let wikiData = store.get('wiki/data');
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
  convertUrl(url) {
    return url.toLowerCase().replace(' ','_').replace(/\?/g,'');
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
          <Card ref={this.cardRef}>
            <AppBar
              color='transparent'
              position='sticky'
              style={{
                zIndex: 1000
              }}
            >
              <Toolbar>
                <Hidden mdUp>
                  <IconButton
                    ref={this.menuButtonRef}
                    color='inherit'
                    onClick={() => { this.setState({ openMenu: !this.state.openMenu })}}
                    edge='start'
                  >
                    <ListIcon />
                  </IconButton>
                </Hidden>
                <Hidden smDown>
                  <WikiNavBar wikiData={this.state.wikiData} />
                </Hidden>
              </Toolbar>
            </AppBar>
            <Box m={2}>
              <Popover
                anchorEl={this.menuButtonRef.current}
                open={this.state.openMenu}
                onClose={() => { this.setState({ openMenu: false })}}
              >
                <List>
                  {this.state.wikiData.map((e, i) => {
                    if(e.md.length > 0) {
                      return (
                        <ListItem button key={i} onClick={() => { this.setState({displayPage: e.url, redirect: true, openMenu: false}); }}>
                          <ListItemText primary={e.path.replace('/', ' / ')} />
                        </ListItem>
                      );
                    }
                    return <div key={i}></div>;
                  })}
                </List>
              </Popover>
              <Route exact path={'/wiki/'}>
                <Typography>
                  Offline ready KSS Wiki. Data is synced from <a href='https://wiki.koronis.cc/'>wiki.koronis.cc</a>.
                  To get started, click the links on the left menu.
                  <br/>
                </Typography>
              </Route>
              {this.state.wikiData.map((e, i) => {
                if(e.md.length <= 0) { return null; }
                return (
                  <Route key={i} exact path={'/wiki/' + e.url}>
                    <Breadcrumbs>
                      {e.path.split('/').map((e2, i2) => {
                        return (
                          <Typography key={i2}>{e2}</Typography>
                        );
                      })}
                    </Breadcrumbs>
                    <ReactMarkdown
                      transformLinkUri={(src) => {
                        try {
                          return src.match(/^http[s]*:\/\//) ? src : '#' + Config.baseUrl + 'wiki/' + e.url.match(/^[^/]+\//)[0] + src;
                        }
                        catch(err) {
                          console.error(err);
                          return src;
                        }
                      }}
                      transformImageUri={(src) => {
                        try {
                          return src.match(/^http[s]*:\/\//) ? src : Config.wikiUrl + e.url.match(/^[^/]+\//)[0] + src;
                        }
                        catch(err) {
                          console.error(err);
                          return src;
                        }
                      }}
                    >
                      {e.md}
                    </ReactMarkdown>
                  </Route>
                );
              })}
              <br/>
              <Typography variant='body2'>
                Last updated {moment(store.get('wiki/lastUpdate')).fromNow()}
              </Typography>
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
