import React from 'react';

const RenderMeanRating = props => (
  <div className="restaurant-item__rating">
    <h4>
          Mean rating is
    </h4>
    {
      props.meanRating
        ? (
          <h4>
            {props.meanRating}
          </h4>
        )
        : (
          <h5>
          No one meal has been rated
          </h5>
        )
    }
  </div>
);

export default RenderMeanRating;