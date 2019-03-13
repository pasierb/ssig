import { h, Component } from "preact";
import EditorContainer from "../containers/EditorContainer";
import { route } from "preact-router";
import { connect } from "unistore/preact";
import activeVersionActions from "../actions/activeVersion";

export default connect(
  "activeVersion",
  activeVersionActions
)(
  class VersionEditPage extends Component {
    handleBack = () => {
      const { projectId } = this.props;

      route(`/projects/${projectId}`);
    };

    componentWillUnmount() {
      this.props.clearActiveVersion();
    }

    render({ versionId, projectId }) {
      return (
        <div>
          <EditorContainer
            projectId={projectId}
            versionId={versionId}
            onBack={this.handleBack}
          />
        </div>
      );
    }
  }
);
