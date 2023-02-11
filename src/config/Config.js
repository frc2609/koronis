let baseUrl = '/';
let packageUrl = '';
let processUrl = '';
let wikiUrl = 'https://koronis-scouting-system.gitlab.io/kss-wiki/';
let tbaUrl = 'https://www.thebluealliance.com/api/v3/';
let environmentConfig = process.env.REACT_APP_ENV;
let version = process.env.REACT_APP_VERSION;
let minVersion = '1.3.3';

if (environmentConfig === 'production') {
  console.info('[Config] App is configured for production. Version is ' + version);
  packageUrl = '/config/';
  processUrl = '/processes/';
}
else {
  console.info('[Config] App is configured for development. Version is ' + version);
  environmentConfig = 'development';
  packageUrl = '/config/';
  processUrl = '/processes/';
}

const Config = {
  version: version,
  minVersion: minVersion,
  baseUrl: baseUrl,
  environmentConfig: environmentConfig,
  packageUrl: packageUrl,
  processUrl: processUrl,
  wikiUrl: wikiUrl,
  tbaUrl: tbaUrl
};
export default Config;
