export const isLandscape = () => {
  return window.screen.width > window.screen.height;
}

export const isLarge = () => {
  return (
    (isLandscape() && (window.screen.width >= 1024 && window.screen.height >= 768)) ||
    (!isLandscape() && (window.screen.height >= 1024 && window.screen.width >= 768))
  );
}

export const getDefaultGrid = () => {
  if(isLarge()) {
    return isLandscape() ? 3 : 4;
  }
  else {
    return isLandscape() ? 6 : 12;
  }
}
