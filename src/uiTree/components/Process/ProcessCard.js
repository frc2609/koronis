import React from 'react';

import * as Interface from 'db/Interface';

import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import DescriptionIcon from '@material-ui/icons/Description';
import ErrorIcon from '@material-ui/icons/Error';
import WarningIcon from '@material-ui/icons/Warning';

var moment = require('moment');

export default class ProcessCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuAnchor: null
    };
  }
  remove() {
    this.closeMenu();
    Interface.removeProcess({
      id: {$eq: this.props.process.id}
    }).then(() => {
      if(typeof this.props.onRemove === 'function') {this.props.onRemove()}
    });
  }
  openMenu(event) {
    this.setState({menuAnchor: event.currentTarget});
  }
  closeMenu() {
    this.setState({menuAnchor: null});
  }
  render() {
    return (
      <Card>
        <CardHeader style={{textAlign: 'left'}}
          avatar={this.props.selectable ?
            <Checkbox
              checked={this.props.selected}
              color='default'
              checkedIcon={<CheckCircleIcon color='primary' style={{fontSize: 40}} />}
              icon={<DescriptionIcon style={{fontSize: 40}} />}
            />
          :
            <DescriptionIcon fontSize='large' />
          }
          title={this.props.process.title}
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
            moment.unix(this.props.process.lastModified).format('ddd, MMM Do YYYY')
          }
        />
        <CardContent>
          <Box mb={3}>
            <Typography variant='body2' align='left' gutterBottom>
              {this.props.process.description}
            </Typography>
          </Box>
          {this.props.process.metadata ?
            this.props.process.metadata.verified ?
              this.props.process.metadata.unModified ?
                <Chip label='Verified' icon={<CheckCircleIcon />} color='primary' />
              :
                <Chip label='Modified' icon={<ErrorIcon />} color='primary' style={{backgroundColor: '#dc3545'}} />
            :
              this.props.process.user !== '' ?
                <Chip label='Unverified' icon={<WarningIcon />} style={{backgroundColor: '#ffc107'}} />
              :
                <Chip label='Anonymous' icon={<ErrorIcon />} color='primary' style={{backgroundColor: '#dc3545'}} />
          :
            <></>
          }
        </CardContent>
      </Card>
    );
  }
}
