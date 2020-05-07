import React from 'react';

function Nav() {
	return (
		<div className = "container">
			<div className = "row">
				<div className = "col-2">
					<a className="navbar-brand" href="/">
						Home
					</a>
				</div>
				<div className = "col-2">
					<a className="navbar-brand" href="/profilePage">
						Profile Page
					</a>
				</div>
				<div className = "col-2">
					<a className="navbar-brand" href="/gamesPage">
						Games
					</a>
				</div>
				<div className = "col-2">
					<a className="navbar-brand" href="/signUpPage">
						Create Accout
					</a>
				</div>
				<div className = "col-2">
					<a className="navbar-brand" href="/LoginPage">
						Login 
					</a>
				</div>
				
			</div>
		</div>

	);
}

export default Nav;


