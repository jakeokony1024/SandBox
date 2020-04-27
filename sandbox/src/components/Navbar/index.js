import React from 'react';

function Nav() {
	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-primary">
			<a className="navbar-brand" href="/">
				Home
			</a>
            <br></br>
            <a className="navbar-brand" href="/pages/profilePage">
				Profile Page
			</a>
            <br></br>
            <a className="navbar-brand" href="/pages/gamesPage">
				Games
			</a>
		</nav>

	);
}

export default Nav;
