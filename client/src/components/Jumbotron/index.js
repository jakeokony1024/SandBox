import React from "react";
import Background from "../../assets/img/bg4.jpg"

function Jumbotron({ children }) {
	return (
		<div
			style={{
				height: 300,
				clear: "both",
				paddingTop: 120,
				textAlign: "center",
				backgroundImage: `url(${Background})`,
				backgroundSize: "cover",
				color: "grey"
			}}
			className="jumbotron">
			{children}
			
		</div>
	);
}

export default Jumbotron;
