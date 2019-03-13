import { h } from "preact";
import helpers from "../../helpers";
import styles from "./VersionCard.scss";

export default function VersionCard(props) {
  const { id, projectId, children, updatedAt, publishedAt } = props;
  const updatedAtDate = updatedAt && new Date(+updatedAt);
  const publishedAtDate = publishedAt && new Date(+publishedAt);

  return (
    <article class={`media ${styles.VersionCard}`}>
      <div class="media-left">
        <figure
          class={`image is-128x128 ${styles["VersionCard__preview-image"]}`}
        >
          <img
            src={helpers.versionPreviewUrl({ versionId: id, projectId })}
            alt="Image"
          />
        </figure>
      </div>
      <div class="media-content">
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
        <div>{children}</div>
      </div>
    </article>
  );
}
