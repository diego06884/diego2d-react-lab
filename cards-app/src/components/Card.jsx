import React from "react";

export const Card = (props) => {
  
  const onRemoveClick = () => {
    alert(  props);
  }
  
  return (
    <div className="col col-12 col-md-6 mb-4">
      <div className="row">
        <div className="col-sm-2">
            <img src={props.avatar_url} style={{width: "100%"}} alt={props.name}/>
        </div>
        <div className="col">
          <h3>{props.name}</h3>
          <button onClick={onRemoveClick} className="btn btn-danger">Remove</button>
        </div>
      </div>
    </div>
  );
}

