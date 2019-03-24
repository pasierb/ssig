export function versionPreviewUrl({ projectId, versionId }) {
  return `/api/v1/projects/${projectId}/versions/${versionId}/preview`;
}

export function projectUrl({ id }) {
  return `${window.location.protocol}//${
    window.location.host
  }/api/v1/projects/${id}`;
}
