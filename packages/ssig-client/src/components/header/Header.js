import { h } from 'preact';
import { Link } from 'preact-router/match';

const Header = () => (
	<nav class="navbar" role="navigation" aria-label="main navigation">
		<div class="navbar-brand">
			<Link href="/" className="navbar-item">Ssig</Link>
		</div>

		<div class="navbar-menu">
			<div class="navbar-start">
				{/* <Link activeClassName={style.active} href="/">Home</Link> */}
			</div>
		</div>
	</nav>
);

export default Header;
