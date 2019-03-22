import { h } from "preact";
import styles from "./VersionImage.scss";
import { versionPreviewUrl } from "../../helpers/versionsHelper";

export default function VersionImage(props) {
  const { projectId, versionId } = props;

  return (
    <div>
      <img src={versionPreviewUrl({ projectId, versionId })} />
    </div>
  );
}
