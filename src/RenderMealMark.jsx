
import React from 'react';

const RenderMealMark = props => (
  <div className="menu-item__meal-mark">
    <h4>
          Your mark is
    </h4>
    {
      props.mark
        ? (
          <h4>
            {props.mark}
          </h4>
        )
        : (
          <h4>
      Not Choosing
          </h4>
        )
    }
  </div>
);

export default RenderMealMark;
