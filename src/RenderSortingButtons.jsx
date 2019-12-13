import React from 'react';
import { byNameToMax, byNameToMin, byRatingToMax, byRatingToMin } from './constants';

const RenderSortingButtons = props => {
  const { sortingRule: sorted } = props;

  return (
    <div className="sorting-buttons">
      <div className="sorting-buttons__by-name">
        <span
          className={`${(sorted === byNameToMax || sorted === byNameToMin) && 'hint'}`}
        >
        Sort by Name
        </span>
        <button
          type="button"
          className={`btn ${sorted === byNameToMax && 'hint'}`}
          onClick={() => props.handleSortByNameToMax()}
        >
        &#11015;
        </button>
        <button
          type="button"
          className={`btn ${sorted === byNameToMin && 'hint'}`}
          onClick={() => props.handleSortByNameToMin()}
        >
        &#11014;
        </button>
      </div>
      <div className="sorting-buttons__by-rating">
        <span
          className={`${(sorted === byRatingToMax || sorted === byRatingToMin) && 'hint'}`}
        >
        Sort by Rating
        </span>
        <button
          type="button"
          className={`btn ${sorted === byRatingToMax && 'hint'}`}
          onClick={() => props.handleSortByRatingToMax()}
        >
        &#11015;
        </button>
        <button
          type="button"
          className={`btn ${sorted === byRatingToMin && 'hint'}`}
          onClick={() => props.handleSortByRatingToMin()}
        >
        &#11014;
        </button>
      </div>
    </div>
  );
};

export default RenderSortingButtons;
