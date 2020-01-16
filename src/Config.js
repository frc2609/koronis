var baseUrl = '';
var packageUrl = '';

if(process.env.NODE_ENV === 'production') {
  console.log('App is configured for production');
  baseUrl = '/kss-client/latest';
  packageUrl = 'https://koronis-scouting-system.gitlab.io/kss-packages/latest/';
}
else {
  console.log('App is configured for development');
  baseUrl = '/kss-client/dev';
  packageUrl = 'https://koronis-scouting-system.gitlab.io/kss-packages/dev/';
}

const Config = {
  baseUrl: baseUrl,
  packageUrl: packageUrl
};
export default Config;
