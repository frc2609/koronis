import React from 'react';

import * as Interface from 'db/Interface';

import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteIcon from '@material-ui/icons/Delete';

var moment = require('moment');

export default class RecordCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuAnchor: null
    };
  }
  matchTypeFormat(mT) {
    if(mT == 't') {return 'Test';}
    else if(mT == 'pf') {return 'Practice Field';}
    else if(mT == 'pm') {return 'Practice Match';}
    else if(mT == 'qm') {return 'Qualifications';}
    else if(mT == 'ef') {return 'Eighth-finals';}
    else if(mT == 'qf') {return 'Quarterfinals';}
    else if(mT == 'sf') {return 'Semifinals';}
    else if(mT == 'f') {return 'Finals';}
    return 'Match';
  }
  remove() {
    this.closeMenu();
    Interface.removeRecord({
      id: {$eq: this.props.record.id}
    }).then(() => {
      if(typeof this.props.onRemove == 'function') {this.props.onRemove()}
    });
  }
  openMenu(event) {
    this.setState({menuAnchor: event.currentTarget});
  }
  closeMenu() {
    this.setState({menuAnchor: null});
  }
  render() {
    return(
      <Card>
        <CardHeader
        avatar={
          <Avatar style={{backgroundColor: (this.props.record.isRedAlliance ? '#f73c3c' : '#008ae6')}}>
            {this.props.record.matchType.toUpperCase()}
          </Avatar>
        }
        title={
          this.matchTypeFormat(this.props.record.matchType) +
          ' ' +
          this.props.record.matchNumber +
          ' - Team ' +
          this.props.record.teamNumber  
        }
        action={
          <>
          <IconButton onClick={this.openMenu.bind(this)}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={this.state.menuAnchor}
            open={Boolean(this.state.menuAnchor)}
            onClose={this.closeMenu.bind(this)}
          >
            <MenuItem onClick={this.remove.bind(this)}>
              <DeleteIcon />
              Remove
            </MenuItem>
          </Menu>
          </>
        }
        subheader={
          moment.unix(this.props.record.startDate).format('ddd, MMM Do YYYY')
        }
        />
        <CardContent>
          <Typography variant='body2' paragraph>
            {this.props.record.comments}
          </Typography>
        </CardContent>
      </Card>
    );
  }
}
