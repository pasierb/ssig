import { h, Component } from "preact";
import EditorContainer from "../containers/EditorContainer";

export default class VersionPage extends Component {
  render({ versionId, projectId }) {
    return (
      <div>
        <div className="container is-fluid">
          <h1 className="title">Version</h1>

          <EditorContainer projectId={projectId} versionId={versionId} />
        </div>
      </div>
    );
  }
}
