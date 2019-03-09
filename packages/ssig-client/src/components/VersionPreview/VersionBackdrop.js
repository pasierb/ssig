import { h } from "preact";

export default function VersionBackdrop(props) {
  const { version, ...rest } = props;
  const style = {
    backgroundColor: version.backgroundColor,
    width: `${version.width}px`,
    height: `${version.height}px`
  };

  return <div style={style} {...rest} />;
}
