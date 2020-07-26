var baseUrl = '';
var packageUrl = '';
var processUrl = '';
var wikiUrl = 'https://koronis-scouting-system.gitlab.io/kss-wiki/';
var tbaUrl = 'https://www.thebluealliance.com/api/v3/';
var environmentConfig = process.env.REACT_APP_ENV;
var version = process.env.REACT_APP_VERSION;

if(environmentConfig === 'production') {
  console.info('[Config] App is configured for production. Version is ' + version);
  baseUrl = '/kss-client/latest';
  packageUrl = 'https://koronis-scouting-system.gitlab.io/kss-packages/latest/';
  processUrl = 'https://koronis-scouting-system.gitlab.io/kss-processes/latest/';
}
else {
  console.info('[Config] App is configured for development. Version is ' + version);
  baseUrl = '/kss-client/dev';
  environmentConfig = 'development';
  packageUrl = 'https://koronis-scouting-system.gitlab.io/kss-packages/dev/';
  processUrl = 'https://koronis-scouting-system.gitlab.io/kss-processes/dev/';
}

const Config = {
  version: version,
  baseUrl: baseUrl,
  environmentConfig: environmentConfig,
  packageUrl: packageUrl,
  processUrl: processUrl,
  wikiUrl: wikiUrl,
  tbaUrl: tbaUrl
};
export default Config;
