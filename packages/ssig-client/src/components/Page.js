import { h } from "preact";
import Header from "./Header";
import Footer from "./Footer";

export default function Page(props) {
  return (
    <div>
      <Header />
      {props.children}
      <Footer />
    </div>
  );
}
