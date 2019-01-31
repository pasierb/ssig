import { h } from "preact";
import Layer from "./Layer";
import styles from "./VersionPreview.scss";

const VersionPreview = props => {
  const { layers } = props;

  return (
    <div className={styles.VersionPreview}>
      {layers.map(layer => (
        <div className={styles.VersionPreview__layerContainer}>
          <Layer layer={layer} />
        </div>
      ))}
    </div>
  );
};

export default VersionPreview;
