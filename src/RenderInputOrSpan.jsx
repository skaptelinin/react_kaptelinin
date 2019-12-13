import React from 'react';

const RenderInputOrSpan = props => {
  if (props.itemCorrection) {
    return (
      <form
        onSubmit={event => props.handleSubmit(event, props.itemID)}
        name={props.itemName}
        className={props.formClass}
      >
        <input
          type="text"
          className={`form-control ${props.inputAdditionalClass}`}
          autoComplete="off"
          required
          autoFocus
          onBlur={() => props.handleBlur(props.itemID, props.itemName)}
          defaultValue={props.item}
        />
      </form>
    );
  }

  return (
    <span
      className="restaurant-text"
      name={props.itemName}
      onDoubleClick={() => props.handleDoubleClick(props.itemID, props.itemName)}
    >
      {props.item}
    </span>
  );
};

export default RenderInputOrSpan;
