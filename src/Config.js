export let baseUrl = '/kss-client/dev';
export let packageUrl = 'https://koronis-scouting-system.gitlab.io/kss-packages/packages/dev/';

if(process.env.NODE_ENV === 'production') {
  baseUrl = '/kss-client/latest';
  packageUrl = 'https://koronis-scouting-system.gitlab.io/kss-packages/packages/latest/';
}
