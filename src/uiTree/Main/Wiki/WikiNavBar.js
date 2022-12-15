import React from 'react';

import Button from '@material-ui/core/Button';

const deepCopy = require('deep-copy');

export default class WikiNavBar extends React.Component {
  addNestedData(inMap, urlArr, pathArr, index) {
    if(urlArr.length <= 0) {
      return inMap;
    }
    let firstUrl = pathArr[0].toLowerCase().replace(' ', '_').replace(/[^a-z0-9]/gi, '');
    let newUrlArr = deepCopy(urlArr);
    newUrlArr.splice(0, 1);
    let firstPath = pathArr[0];
    let newPathArr = deepCopy(pathArr);
    newPathArr.splice(0, 1);
    let currUrl = urlArr.join('/');
    if(typeof inMap[firstUrl] === 'undefined') {
      inMap[firstUrl] = {};
    }
    inMap[firstUrl].name = firstPath;
    inMap[firstUrl].url = currUrl;
    inMap[firstUrl].index = index;
    if(typeof inMap[firstUrl].children === 'undefined') {
      inMap[firstUrl].children = {};
    }
    inMap[firstUrl].children = this.addNestedData(deepCopy(inMap[firstUrl].children), newUrlArr, newPathArr, index);
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
  render() {
    let wikiMap = this.transformWikiData();
    console.log(wikiMap)
    return (
      <>
        {Object.keys(wikiMap).map((e, i) => {
          return (
            <Button key={i}>
              {wikiMap[e].name}
            </Button>
          );
        })}
      </>
    );
  }
}