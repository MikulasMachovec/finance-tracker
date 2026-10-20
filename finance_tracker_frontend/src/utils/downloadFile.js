export const downloadFile = (blob, filename) => {
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = downloadUrl;
    link.download = filename;

    document.body.appendChild(link);
    link.click();
    link.remove();

    window.setTimeout(() => {
        window.URL.revokeObjectURL(downloadUrl);
    }, 1000);
};