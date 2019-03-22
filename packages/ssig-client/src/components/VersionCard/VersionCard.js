import { h } from "preact";
import { createContext } from "preact-context";

import styles from "./VersionCard.scss";
import VersionImage from "../VersionImage";

const VersionContext = createContext({});

function VersionInfo() {
  return (
    <VersionContext.Consumer>
      {({ updatedAt, publishedAt }) => {
        const updatedAtDate = updatedAt && new Date(+updatedAt);
        const publishedAtDate = publishedAt && new Date(+publishedAt);

        return (
          <div>
            {publishedAtDate && (
              <p>
                <strong>published at</strong>{" "}
                <small>{publishedAtDate.toLocaleString()}</small>
              </p>
            )}
            {updatedAtDate && (
              <p>
                <strong>updated at</strong>{" "}
                <small>{updatedAtDate.toLocaleString()}</small>
              </p>
            )}
          </div>
        );
      }}
    </VersionContext.Consumer>
  );
}

function VersionMedia() {
  return (
    <VersionContext.Consumer>
      {({ id, projectId }) => (
        <div class="media-left">
          <figure
            class={`image is-128x128 ${styles["VersionCard__preview-image"]}`}
          >
            <VersionImage versionId={id} projectId={projectId} />
          </figure>
        </div>
      )}
    </VersionContext.Consumer>
  );
}

function VersionActions(props) {
  return <div className="buttons">{props.children}</div>;
}

function VersionContent(props) {
  return <div className="media-content">{props.children}</div>;
}

function VersionCard(props) {
  const { id, projectId, children } = props;

  return (
    <VersionContext.Provider value={props}>
      <article class={`media ${styles.VersionCard}`}>
        <VersionMedia />
        <VersionContent>
          <VersionInfo />
          <VersionActions>{props.actions}</VersionActions>
        </VersionContent>
      </article>
    </VersionContext.Provider>
  );
}

VersionCard.Info = VersionInfo;
VersionCard.VersionMedia = VersionMedia;

export default VersionCard;
