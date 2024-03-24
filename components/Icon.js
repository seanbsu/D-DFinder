const Icon = ({ name }) => {
  const iconsList = {
    heart: '\uE800',
    star: '\uE801',
    like: '\uE800',
    dislike: '\uE802',
    flash: '\uE803',
    marker: '\uF031',
    filter: '\uF0B0',
    user: '\uF061',
    circle: '\uF039',
    hashtag: '\uF029',
    calendar: '\uF4C5',
    chevronLeft: '\uF004',
    optionsV: '\uF142',
    optionsH: '\uF141',
    chat: '\uF4AC',
    explore: '\uF50D'
  };

  const icon = iconsList[name] ; // Default to empty string if name is not found

  return icon;
};

export default Icon;
