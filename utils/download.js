export const downloadFile = (file) => {
  if (!file) return;

  window.location.href = `/api/download?file=${encodeURIComponent(file)}`;
};
