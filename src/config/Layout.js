export const isLandscape = () => {
  return window.innerWidth > window.innerHeight;
}

export const isLarge = () => {
  return (
    (isLandscape() && (window.innerWidth >= 1024 && window.innerHeight >= 768)) ||
    (!isLandscape() && (window.innerHeight >= 1024 && window.innerWidth >= 768))
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

export const isTouchScreen = () => {
  return (
    ('ontouchstart' in window) ||
    (navigator.MaxTouchPoints > 0) ||
    (navigator.msMaxTouchPoints > 0)
  );
}
