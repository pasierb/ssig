import { h } from "preact";
import NewLayerForm from "../components/NewLayerForm";
import client from "../graph";

const mutationQuery = `
  mutation createNewLayer($layerInput: LayerInput!, $versionId: String!) {
    createLayer(versionId: $versionId, layerInput: $layerInput) {
      id
    }
  }
`;

export default function NewLayerFormContainer(props) {
  const { versionId, ...rest } = props;

  const handleSubmit = ({ name, type }) => {
    const layerInput = { name, type };

    client.request(mutationQuery, { versionId, layerInput }).then(onSubmit);
  };

  return <NewLayerForm onSubmit={handleSubmit} {...rest} />;
}
