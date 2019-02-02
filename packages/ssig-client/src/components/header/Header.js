import { h } from 'preact';
import { Link } from 'preact-router/match';

const Header = () => (
	<nav className="navbar" role="navigation" aria-label="main navigation">
		<div className="navbar-brand">
			<Link href="/" className="navbar-item">Ssig</Link>
		</div>

		<div className="navbar-menu">
			<div className="navbar-start">
				{/* <Link activeClassName={style.active} href="/">Home</Link> */}
			</div>
		</div>
	</nav>
);

export default Header;
