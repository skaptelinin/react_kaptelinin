import React from 'react';
import * as constantsModule from './constants';

const RenderRatingButtons = props => {
  const buttons = [];

  for (let i = 1; i <= constantsModule.maxMark; i++) {
    buttons.push(i);
  }

  return buttons.map(item => (
    <button
      className="btn"
      key={Math.random()}
      type="button"
      onClick={() => props.rateFood(item, props.id)}
    >
      {item}
    </button>
  ));
};

export default RenderRatingButtons;
