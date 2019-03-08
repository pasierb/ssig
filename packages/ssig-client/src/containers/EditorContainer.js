import { h, Component } from "preact";
import { connect } from "unistore/preact";
import { throttle } from "lodash";

import activeVersionActions from "../actions/activeVersion";
import Editor from "../components/Editor/Editor";

export default connect(
  "activeVersion",
  activeVersionActions
)(
  class EditorContainer extends Component {
    componentWillMount() {
      const { fetchVersion, versionId, projectId, activeVersion } = this.props;

      if (!activeVersion || activeVersion.id !== versionId) {
        fetchVersion({ versionId, projectId });
      }
    }

    handleLayerChange = throttle(layer => {
      this.props.updateLayer(layer);
    }, 100);

    render({
      activeVersion,
      deleteLayer,
      createLayer,
      promoteLayer,
      demoteLayer,
      publishVersion
    }) {
      if (!activeVersion) {
        return <p>Loading</p>;
      }

      return (
        <Editor
          version={activeVersion}
          layers={activeVersion.layers}
          onVersionPublish={publishVersion}
          onLayerChange={this.handleLayerChange}
          onLayerCreate={createLayer}
          onLayerPromote={promoteLayer}
          onLayerDemote={demoteLayer}
          onLayerDelete={deleteLayer}
        />
      );
    }
  }
);
