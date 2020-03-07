var baseUrl = '';
var packageUrl = '';
var processUrl = '';
var version = process.env.REACT_APP_VERSION;

if(process.env.REACT_APP_ENV === 'production') {
  console.info('[Config] App is configured for production. Version is ' + version);
  baseUrl = '/kss-client/latest';
  packageUrl = 'https://koronis-scouting-system.gitlab.io/kss-packages/latest/';
  processUrl = 'https://koronis-scouting-system.gitlab.io/kss-processes/latest/';
}
else {
  console.info('[Config] App is configured for development. Version is ' + version);
  baseUrl = '/kss-client/dev';
  packageUrl = 'https://koronis-scouting-system.gitlab.io/kss-packages/dev/';
  processUrl = 'https://koronis-scouting-system.gitlab.io/kss-processes/dev/';
}

const Config = {
  version: version,
  baseUrl: baseUrl,
  packageUrl: packageUrl,
  processUrl: processUrl
};
export default Config;
