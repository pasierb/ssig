import { h, Component } from "preact";
import EditorContainer from "../containers/EditorContainer";

export default class VersionPage extends Component {
  render({ versionId, projectId }) {
    return (
      <div>
        <EditorContainer projectId={projectId} versionId={versionId} />
      </div>
    );
  }
}
