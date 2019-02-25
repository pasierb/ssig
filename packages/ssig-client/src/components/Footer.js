import { h } from "preact";

export default function Footer() {
  const year = (new Date()).getFullYear();

  return (
    <footer className="footer">
      <div className="content has-text-centered">
        <p><span className="brand">Ssig</span> &copy; {year}</p>
      </div>
    </footer>
  );
}
