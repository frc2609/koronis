import React from 'react';

import * as Interface from 'db/Interface';
import * as TbaKey from 'sync/tba/TbaKey';

import LinearProgress from '@material-ui/core/LinearProgress';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
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
import Link from '@material-ui/core/Link';

import Carousel from 'nuka-carousel';

var moment = require('moment');
var axios = require('axios');
var store = require('store');

export default class TeamCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: '',
      name: '',
      schoolName: '',
      city: '',
      stateProv: '',
      country: '',
      website: '',
      rookieYear: '',
      subObj: null,
      avatarObj: null,
      mediaUrls: []
    };
  }
  blank() {
    this.setState({
      nickname: '',
      name: '',
      schoolName: '',
      city: '',
      stateProv: '',
      country: '',
      website: '',
      rookieYear: '',
      avatarObj: null,
      mediaUrls: []
    });
  }
  refresh() {
    this.blank();
    if(this.state.subObj !== null) {
      this.state.subObj.unsubscribe();
    }
    if(typeof this.props.teamNumber !== 'undefined') {
      Interface.queryTeams({teamNumber: Number(this.props.teamNumber)}, {}).then((query) => {
        var sub = query.$.subscribe((teams) => {
          if(teams.length > 0) {
            var targetTeam = teams[0].toJSON();
            this.getMedia(targetTeam.key);
            this.setState({
              nickname: targetTeam.nickname,
              name: targetTeam.name,
              schoolName: targetTeam.schoolName,
              city: targetTeam.city,
              stateProv: targetTeam.stateProv,
              country: targetTeam.country,
              website: targetTeam.website,
              rookieYear: targetTeam.rookieYear
            });
          }
        });
        this.setState({subObj: sub});
      });
    }
  }
  getMedia(key) {
    try {
      var tbaKey = TbaKey.getKey();
      var requestConfig = {
        url: '/team/' + key + '/media/' + store.get('settings/currentYear'),
        baseURL: 'https://www.thebluealliance.com/api/v3/',
        headers: {
          'X-TBA-Auth-Key': tbaKey
        }
      };
      axios.request(requestConfig).then((response) => {
        var data = response.data;
        var avatarObj = null;
        var mediaUrls = [];
        for(var i = 0;i < data.length;i++) {
          if(data[i].type === 'avatar') {
            avatarObj = (
              <img src={'data:image/png;base64,' + data[i].details.base64Image} />
            );
          }
          if(data[i].type === 'imgur') {
            mediaUrls.push(data[i].direct_url);
          }
        }
        this.setState({
          avatarObj: avatarObj,
          mediaUrls: mediaUrls
        })
      });
    }
    catch(err) {}
  }
  componentDidMount() {
    this.refresh();
  }
  componentDidUpdate(prevProps) {
    if(prevProps.teamNumber !== this.props.teamNumber) {
      this.refresh();
    }
  }
  componentWillUnmount() {
    if(this.state.subObj !== null) {
      this.state.subObj.unsubscribe();
    }
  }
  render() {
    return(
      <Card>
        <CardHeader style={{textAlign: 'left'}}
          avatar={this.props.selectable ?
            <Checkbox
              checked={this.props.selected}
              color='default'
              checkedIcon={<CheckCircleIcon color='primary' style={{fontSize: 40}} />}
              icon={<RadioButtonUncheckedIcon style={{fontSize: 40}} />}
            />
          :
            this.state.avatarObj ?
              this.state.avatarObj
            :
              <Avatar style={{backgroundColor: '#008ae6'}}>
                {Number(this.props.teamNumber)}
              </Avatar>
          }
          title={this.state.nickname}
          subheader={this.state.name === '' ?
            ''
          :
            this.state.city + ', ' + this.state.stateProv + ' ' + this.state.country + '\nRookie Year: ' + this.state.rookieYear
          }
        />
        {this.state.mediaUrls.length === 0 ?
          <></>
        :
          <Carousel
            heightMode='current'
            wrapAround
          >
            {this.state.mediaUrls.map((e, i) => {
              return (
                <img key={i} src={e} />
              );
            })}
          </Carousel>
        }
        <CardContent style={{textAlign: 'left'}}>
          {this.state.name === '' ?
            <LinearProgress variant='query' />
          :
            <>
              <Typography variant='body2' paragraph>
                {this.state.name}
              </Typography>
              <Typography variant='body2' paragraph>
                <Link target='_blank' rel='noopener noreferrer' href={this.state.website}>
                  {this.state.website}
                </Link>
              </Typography>
            </>
          }
        </CardContent>
      </Card>
    );
  }
}
