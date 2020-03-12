import React from 'react';

import * as Interface from 'db/Interface';
import * as Color from 'config/Color';

import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';

var moment = require('moment');
var deepcopy = require('deep-copy');
var deepCompare = require('deep-compare');

export default class RecordCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuAnchor: null
    };
    this.interval = null;
    this.canvasElem = null;
    this.ctx = null;

    this.currTime = 0;
    this.currMultiplier = 0;
    this.positionLog = [];
    this.eventLog = [];
  }
  matchTypeFormat(mT) {
    if(mT === 't') {return 'Test';}
    else if(mT === 'pf') {return 'Practice Field';}
    else if(mT === 'pm') {return 'Practice Match';}
    else if(mT === 'qm') {return 'Qualifications';}
    else if(mT === 'ef') {return 'Eighth-finals';}
    else if(mT === 'qf') {return 'Quarterfinals';}
    else if(mT === 'sf') {return 'Semifinals';}
    else if(mT === 'f') {return 'Finals';}
    return 'Match';
  }
  remove() {
    this.closeMenu();
    Interface.removeRecord({
      id: {$eq: this.props.record.id}
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
  init() {
    this.createLogs();
    if(typeof this.refs.recordCanvas !== 'undefined') {
      this.canvasElem = this.refs.recordCanvas;
      this.ctx = this.canvasElem.getContext('2d');
      this.interval = window.setInterval(this.draw.bind(this), 100);
    }
  }
  createLogs() {
    if(typeof this.props.record !== 'undefined') {
      this.positionLog = deepcopy(this.props.record.positionLog);
      this.positionLog.sort((e1, e2) => {return e1.timeStamp - e2.timeStamp});
      this.eventLog = deepcopy(this.props.record.eventLog);
      this.eventLog.sort((e1, e2) => {return e1.timeStamp - e2.timeStamp});
    }
  }
  draw() {
    if(typeof this.canvasElem !== 'undefined' || this.canvasElem !== null) {
      try {
        this.canvasElem.width = this.canvasElem.getBoundingClientRect().width;
        this.canvasElem.height = 27/56 * this.canvasElem.width;
        this.currMultiplier = this.canvasElem.width/56;
        var currColor = this.props.record.isRedAlliance ? 'rgb(255,0,0)' : 'rgb(0,0,255)';
        for(var i = 0;i < this.positionLog.length;i++) {
          var alpha = this.positionLog[i].timeStamp > this.currTime ? 0 : 1 - ((this.currTime - this.positionLog[i].timeStamp) * 0.1);
          alpha = alpha < 0 ? 0 : alpha;
          alpha = alpha > 1 ? 1 : alpha;
          currColor = this.props.record.isRedAlliance ? 'rgba(255,0,0,' + alpha + ')' : 'rgba(0,0,255,' + alpha + ')';
          this.ctx.fillStyle = currColor;
          this.ctx.beginPath();
          this.ctx.arc(
            this.positionLog[i].x*this.currMultiplier,
            this.positionLog[i].y*this.currMultiplier,
            alpha*this.currMultiplier/2,
            0,
            2 * Math.PI
          );
          this.ctx.fill();
        }
        for(var i = 0;i < this.eventLog.length;i++) {
          var alpha = this.eventLog[i].timeStamp > this.currTime ? 0 : 1 - ((this.currTime - this.eventLog[i].timeStamp) * 1.5);
          alpha = alpha < 0 ? 0 : alpha;
          alpha = alpha > 1 ? 1 : alpha;
          currColor = Color.getColor(this.eventLog[i].name + ': ' + JSON.stringify(this.eventLog[i].variables));
          this.ctx.strokeStyle = currColor;
          this.ctx.beginPath();
          this.ctx.arc(
            this.eventLog[i].position.x*this.currMultiplier,
            this.eventLog[i].position.y*this.currMultiplier,
            alpha*this.currMultiplier*3,
            0,
            2 * Math.PI
          );
          this.ctx.stroke();
        }
        currColor = this.props.record.isRedAlliance ? 'rgb(255,0,0)' : 'rgb(0,0,255)';
        this.ctx.fillStyle = currColor;
        this.ctx.fillRect(
          0,
          0,
          (this.currTime / this.positionLog[this.positionLog.length-1].timeStamp) * this.canvasElem.width,
          this.canvasElem.height * 0.01
        );
        this.ctx.fillStyle = 'rgb(0,0,0)';
        this.ctx.fillRect(
          (150 / this.positionLog[this.positionLog.length-1].timeStamp) * this.canvasElem.width,
          0,
          this.canvasElem.height * 0.01,
          this.canvasElem.height * 0.01
        );
        this.currTime += 0.1;
        if(this.currTime > this.positionLog[this.positionLog.length-1].timeStamp) {
          this.currTime = 0;
        }
      }
      catch(err) {}
    }
  }
  componentDidMount() {
    this.init();
  }
  componentDidUpdate(prevProps, prevState) {
    if(!deepCompare(prevProps.record, this.props.record)) {
      if(this.interval !== null) {
        window.clearInterval(this.interval);
      }
      this.init();
    }
  }
  componentWillUnmount() {
    if(this.interval !== null) {
      window.clearInterval(this.interval);
    }
  }
  render() {
    return(
      <Card>
        <CardHeader style={{textAlign: 'left'}}
          avatar={
            this.props.selectable ? (
              <Checkbox
                checked={this.props.selected}
                color='default'
                checkedIcon={<CheckCircleIcon color='primary' style={{fontSize: 40}} />}
                icon={<RadioButtonUncheckedIcon style={{fontSize: 40}} />}
              />
            ) : (
              <Avatar style={{backgroundColor: (this.props.record.isRedAlliance ? '#f73c3c' : '#008ae6')}}>
                {this.props.record.matchType.toUpperCase()}
              </Avatar>
            )
          }
          title={
            'Team ' +
            this.props.record.teamNumber +
            ' - ' +
            this.matchTypeFormat(this.props.record.matchType) +
            ' ' +
            this.props.record.matchNumber
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
        {typeof this.props.children !== 'undefined' ?
          this.props.children
        :
          <canvas ref='recordCanvas' style={{width: '100%'}}></canvas>
        }
        <CardContent>
          <Typography variant='body2' align='left'>
            {this.props.record.comments}
          </Typography>
        </CardContent>
      </Card>
    );
  }
}
