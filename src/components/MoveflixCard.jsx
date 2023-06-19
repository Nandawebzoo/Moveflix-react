import React from 'react';

function MoveflixCard(props) {
  return (
    <div className="col-md-3 movie-album">
      <div className="card mb-3 img-back">
        <img className="card-img-top" src={props.imageUrl} alt="" />
        <button className="btn btn-primary btn-watch" type="button" onClick={() => props.onShowDetails()}>
          More Details
        </button>
      </div>
    </div>
  );
}

export default MoveflixCard;
