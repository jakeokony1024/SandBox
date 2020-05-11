import React from 'react';
import './style.css'

function ImageCard(props) {
    return (
    //   <div className="card">
    //     <div className="img-container">
    //     <img alt={props.name} src={props.image} />
    //     </div>
    //     <span onClick={() => props.imageClick(props.id)} className="click"></span>
    //   </div>
      
      <div onClick={() => props.imageClick(props.id)} className="card col-md-3">
				<div className="img-container">
					<img alt={props.name} src={props.image} />
				</div>
			</div>
    );
  }
  
  export default ImageCard;