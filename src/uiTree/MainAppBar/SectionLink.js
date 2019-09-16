import { Redirect } from 'react-router';

export default class SectionLink {
  constructor(props) {
    this.state = {redirect: false};
  }
  handleOnClick = () => {
    this.setState({redirect: true});
  }

  render() {
    if (this.state.redirect) {
      return <Redirect push to={this.props.to} />;
    }

    return <button onClick={this.handleOnClick} type="button">Button</button>;
  }
}
