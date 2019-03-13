export function versionPreviewUrl({ projectId, versionId }) {
  return `/api/v1/projects/${projectId}/versions/${versionId}/preview`;
}
