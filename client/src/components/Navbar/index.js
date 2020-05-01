import React from 'react';

function Nav() {
	return (
		<div className = "container">
			<div className = "row">
				<div className = "col-4">
					<a className="navbar-brand" href="/">
						Home
					</a>
				</div>
				<div className = "col-4">
					<a className="navbar-brand" href="/pages/profilePage">
						Profile Page
					</a>
				</div>
				<div className = "col-4">
					<a className="navbar-brand" href="/pages/gamesPage">
						Games
					</a>
					<div className = "col-4">
					<a className="navbar-brand" href="/pages/signUpPage">
						Create Accout
					</a>
				</div>
				</div>
			</div>
		</div>

	);
}

export default Nav;


