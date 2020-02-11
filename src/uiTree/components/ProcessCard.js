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
        />
        <CardContent style={{textAlign: 'left'}}>
          <Typography variant='body2' paragraph>
            {this.props.process.description}
          </Typography>
        </CardContent>
      </Card>
    );
  }
}
