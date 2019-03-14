import { h, createContext, Fragment } from "preact";
import helpers from "../../helpers";
import styles from "./VersionCard.scss";

const Version = createContext({});

export function VersionCardImage() {
  return (
    <Version.Consumer>
      {version => (
        <div class="media-left">
          <figure
            class={`image is-128x128 ${styles["VersionCard__preview-image"]}`}
          >
            <img
              src={helpers.versionPreviewUrl({
                versionId: version.id,
                projectId: version.projectId
              })}
              alt="Image"
            />
          </figure>
        </div>
      )}
    </Version.Consumer>
  );
}

export function VersionCardDetails() {
  return (
    <Version.Consumer>
      {({ publishedAt, updatedAt }) => {
        const updatedAtDate = updatedAt && new Date(+updatedAt);
        const publishedAtDate = publishedAt && new Date(+publishedAt);

        return (
          <Fragment>
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
          </Fragment>
        );
      }}
    </Version.Consumer>
  );
}

function VersionCardDelete({ onClick }) {
  return (
    <Version.Consumer>
      {version => (
        <button
          className="delete is-pulled-right"
          onClick={event => onClick(event, version)}
        />
      )}
    </Version.Consumer>
  );
}

function VersionCard(props) {
  const { children } = props;

  return (
    <Version.Provider value={props}>
      <article class={`media ${styles.VersionCard}`}>
        <VersionCardImage />
        <div class="media-content">
          {children ? children : <VersionCardDetails />}
        </div>
      </article>
    </Version.Provider>
  );
}

VersionCard.Details = VersionCardDetails;
VersionCard.DeleteButton = VersionCardDelete;

export default VersionCard;
