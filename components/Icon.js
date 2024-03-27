const Icon = ({ name }) => {
  const iconsList = {
    heart: '\uE800',
    star: '\uE801',
    like: '\uE800',
    dislike: '\uE802',
    flash: '\uE803',
    marker: '\uF031',
    filter: '\uF0B0',
    user: '\u{1F464}',
    circle: '\uF039',
    hashtag: '\uF029',
    calendar: '\uF4C5',
    chevronLeft: '\uF004',
    optionsV: '\uF142',
    optionsH: '\u{F141}',
    chat: '\u{1F4AC}',
    explore: '\uF50D'
  };

  const icon = iconsList[name] ; 
  return icon;
};

export default Icon;
