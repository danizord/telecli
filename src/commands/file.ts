import { callApi, getFileUrl } from "../api";
import type { File } from "../types";

export async function getFile(fileId: string) {
  const response = await callApi<File>("getFile", { file_id: fileId });

  // Add the download URL to the result if we got a file path
  if (response.ok && response.result?.file_path) {
    return {
      ...response,
      result: {
        ...response.result,
        download_url: getFileUrl(response.result.file_path),
      },
    };
  }

  return response;
}

export async function downloadFile(fileId: string, outputPath: string) {
  const fileInfo = await getFile(fileId);

  if (!fileInfo.ok || !fileInfo.result?.file_path) {
    return { ok: false, error: "Failed to get file info" };
  }

  const downloadUrl = getFileUrl(fileInfo.result.file_path);
  const response = await fetch(downloadUrl);

  if (!response.ok) {
    return { ok: false, error: `Failed to download: ${response.statusText}` };
  }

  const arrayBuffer = await response.arrayBuffer();
  await Bun.write(outputPath, arrayBuffer);

  return {
    ok: true,
    result: {
      path: outputPath,
      size: arrayBuffer.byteLength,
    },
  };
}
