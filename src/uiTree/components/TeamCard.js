import React from 'react';

import * as Interface from 'db/Interface';
import * as TbaTeam from 'sync/tba/TbaTeam';

import LinearProgress from '@material-ui/core/LinearProgress';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Carousel from 'nuka-carousel';

export default class TeamCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      nickname: '',
      name: '',
      schoolName: '',
      city: '',
      stateProv: '',
      country: '',
      website: '',
      rookieYear: '',
      avatarObj: null,
      showMedia: false,
      mediaUrls: []
    };
    this.onlineListener = null;
    this.teamsSubscription = null;
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
    this.setState({loading: true});
    if(this.teamsSubscription !== null) {
      this.teamsSubscription.unsubscribe();
    }
    if(typeof this.props.teamNumber !== 'undefined') {
      Interface.subscribeTeams({teamNumber: Number(this.props.teamNumber)}, {}, (teams) => {
        if(teams.length > 0) {
          var targetTeam = teams[0];
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
        this.setState({loading: false});
      }).then((subscription) => {
        this.teamsSubscription = subscription;
      });
    }
  }
  getMedia(key) {
    TbaTeam.getMedia(key).then((obj) => {
      this.setState({
        avatarObj: (<img alt={obj.avatarBaseSrc} src={obj.avatarBaseSrc} />),
        mediaUrls: obj.mediaUrls
      });
    });
  }
  componentDidMount() {
    this.refresh();
    this.onlineListener = this.refresh.bind(this);
    window.addEventListener('online', this.onlineListener);
  }
  componentDidUpdate(prevProps) {
    if(prevProps.teamNumber !== this.props.teamNumber) {
      this.refresh();
    }
  }
  componentWillUnmount() {
    if(this.teamsSubscription !== null) {
      this.teamsSubscription.unsubscribe();
    }
    if(this.onlineListener !== null) {
      window.removeEventListener('online', this.onlineListener);
    }
  }
  render() {
    return(
      this.props.teamNumber <= 0 ?
        <></>
      :
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
          <CardContent style={{textAlign: 'left'}}>
            {this.state.loading ?
              <LinearProgress variant='query' />
            : this.state.name === '' ?
              null
            :
              <>
                <Typography variant='body2' paragraph>
                  {this.state.name}
                </Typography>
                <Typography variant='body2'>
                  <Link target='_blank' rel='noopener noreferrer' href={this.state.website}>
                    {this.state.website}
                  </Link>
                </Typography>
              </>
            }
          </CardContent>
          {this.state.mediaUrls.length === 0 ?
            <></>
          :
            <>
              <CardActions disableSpacing>
                <IconButton
                  onClick={() => {this.setState({
                    showMedia: !this.state.showMedia
                  })}}
                  style={{
                    marginLeft: 'auto',
                    transform: this.state.showMedia ? 'rotate(0deg)' : 'rotate(180deg)'
                  }}
                >
                  <ExpandMoreIcon />
                </IconButton>
              </CardActions>
              <Collapse in={this.state.showMedia}>
                <CardContent>
                  <Carousel
                    heightMode='current'
                    wrapAround
                  >
                    {this.state.mediaUrls.map((e, i) => {
                      return (
                        <img key={i} alt={e} src={e} />
                      );
                    })}
                  </Carousel>
                </CardContent>
              </Collapse>
            </>
          }
        </Card>
    );
  }
}
