import { h } from "preact";
import Layer from "./Layer";
import VersionBackdrop from "./VersionBackdrop";
import styles from "./VersionPreview.scss";

const VersionPreview = props => {
  const { version, layers } = props;

  return (
    <div className={styles.VersionPreview}>
      <VersionBackdrop version={version} />

      {layers.map(layer => (
        <div className={styles.VersionPreview__layerContainer}>
          <Layer layer={layer} version={version} />
        </div>
      ))}
    </div>
  );
};

export default VersionPreview;
