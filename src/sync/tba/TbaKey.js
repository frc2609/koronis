const store = require('store');

export const getKey = () => {
  let tbaKey = store.get('settings/tba/key');
  if(typeof tbaKey === 'undefined') {
    tbaKey = 'slb3DLgvOJNW9PuRUpFYlX5kKmfIxxVhOLJd6Lb2cyl6lTaiDZwB8uiPodSlXzw2';
    store.set('settings/tba/key', tbaKey);
  }
  return tbaKey;
}
