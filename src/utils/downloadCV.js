/**
 * Bulletproof CV Download Handler
 * Uses Blob fetch to force direct file download in all browsers (Chrome, Edge, Safari, Firefox, Mobile)
 */
export async function downloadResume(e) {
  if (e && e.preventDefault) {
    e.preventDefault();
  }

  try {
    const response = await fetch('/api/download-cv');
    if (!response.ok) {
      throw new Error('Download failed');
    }
    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = blobUrl;
    a.download = 'Mahadi_Hasan_MERN_Resume.pdf';
    document.body.appendChild(a);
    a.click();

    setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(blobUrl);
    }, 2000);
  } catch (err) {
    // Direct URL fallback
    window.location.href = '/api/download-cv';
  }
}
