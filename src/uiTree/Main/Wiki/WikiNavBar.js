import React from 'react';

import WikiButton from 'uiTree/Main/Wiki/WikiButton';

const deepCopy = require('deep-copy');
const deepCompare = require('fast-deep-equal');

export default class WikiNavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wikiMap: this.transformWikiData(),
      selected: -1
    };
  }
  addNestedData(inMap, urlArr, pathArr, index, builtUrlArr = []) {
    if(urlArr.length <= 0) {
      return inMap;
    }
    let firstUrl = pathArr[0].toLowerCase().replace(' ', '_').replace(/[^a-z0-9]/gi, '');
    let newUrlArr = deepCopy(urlArr);
    let newBuiltUrlArr = deepCopy(builtUrlArr);
    newBuiltUrlArr.push(newUrlArr.splice(0, 1));
    let firstPath = pathArr[0];
    let newPathArr = deepCopy(pathArr);
    newPathArr.splice(0, 1);
    if(typeof inMap[firstUrl] === 'undefined') {
      inMap[firstUrl] = {};
    }
    inMap[firstUrl].name = firstPath;
    let currUrl = newBuiltUrlArr.join('/');
    inMap[firstUrl].url = currUrl;
    inMap[firstUrl].index = index;
    if(typeof inMap[firstUrl].children === 'undefined') {
      inMap[firstUrl].children = {};
    }
    inMap[firstUrl].children = this.addNestedData(deepCopy(inMap[firstUrl].children), newUrlArr, newPathArr, index, newBuiltUrlArr);
    return inMap;
  }
  transformWikiData() {
    let wikiData = this.props.wikiData.filter(e => e.url.length > 0);
    let wikiMap = {};
    for(let i = 0;i < wikiData.length;i++) {
      let wikiPage = wikiData[i];
      let wikiUrl = wikiPage.url.replace('.md', '');
      let wikiUrlArr = wikiUrl.split('/');
      let wikiPathArr = wikiPage.path.split('/');
      this.addNestedData(wikiMap, wikiUrlArr, wikiPathArr, i);
    }
    return wikiMap;
  }
  componentDidUpdate(prevProps, prevState) {
    if(!deepCompare(prevProps.wikiData, this.props.wikiData)) {
      this.setState({
        wikiMap: this.transformWikiData()
      });
    }
  }
  render() {
    return (
      <>
        {Object.keys(this.state.wikiMap).sort((e1, e2) => this.state.wikiMap[e1].index - this.state.wikiMap[e2].index).map((e, i) => {
          return (
            <WikiButton
              key={i}
              wikiMap={this.state.wikiMap[e]}
            />
          );
        })}
      </>
    );
  }
}