import { h } from "preact";
import { versionPreviewUrl } from "../../helpers";

export default function VersionImage(props) {
  const { projectId, versionId } = props;

  return (
    <div>
      <img src={versionPreviewUrl({ projectId, versionId })} />
    </div>
  );
}
