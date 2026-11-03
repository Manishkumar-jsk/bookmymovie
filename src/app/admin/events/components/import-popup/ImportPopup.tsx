import {
  useGetImportLogsQuery,
  useImportEventsMutation,
  useLazyGetImportStatusQuery,
} from "@/app/store/api/eventsApi";
import { EventImportStatusResponse } from "@/app/types/events";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface ImportPopupProps {
  isImportPopupOpen: boolean;
  onClose: () => void;
}
const ImportPopup = ({ isImportPopupOpen, onClose }: ImportPopupProps) => {
  const [file, setFile] = useState<File | null | undefined>(null);
  const [importStatus, setImportStatus] =
    useState<EventImportStatusResponse | null>(null);
  const [importId, setImportId] = useState(null);
  const [importEvents] = useImportEventsMutation();
  const [getImportStatus] = useLazyGetImportStatusQuery();
  const { data: importLogsData } = useGetImportLogsQuery({ type: 1 });
  const {
    error,
    filename,
    total_records,
    imported_records,
    updated_records,
    status,
  } = importLogsData?.data || {};

  const isPercentageError =
    importStatus?.percentage || importStatus?.error_percentage;

  const handleBrowseFile = () => {
    const element = document.getElementById("fileInput");
    element?.click();
  };

  const handleClose = () => {
    setImportId(null);
    setImportStatus(null);
    setFile(null);
    onClose();
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select file");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", "1");
      const response = await importEvents(formData).unwrap();
      setImportId(response?.importId);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  useEffect(() => {
    if (!importId) return;

    const checkStatus = async () => {
      try {
        const response = await getImportStatus(importId).unwrap();

        console.log(response, "response");
        setImportStatus(response);

        if (response.status === "completed" || response.status === "failed") {
          clearInterval(interval);
        }
      } catch (error) {
        console.error("Status check failed:", error);
      }
    };

    checkStatus();

    const interval: ReturnType<typeof setInterval> = setInterval(
      checkStatus,
      1000,
    );

    return () => {
      clearInterval(interval);
    };
  }, [importId]);

  if (!isImportPopupOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-3xl w-full p-6 shadow-lg relative max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Import</h2>
        <div className="flex justify-center">
          <input
            id="fileInput"
            type="file"
            accept=".csv"
            onChange={(e) => setFile(e?.currentTarget?.files?.[0])}
            className="hidden"
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => handleBrowseFile()}
              className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white transition cursor-pointer"
            >
              Browse File
            </button>
            <button
              type="button"
              onClick={() => handleUpload()}
              className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-700 text-white transition cursor-pointer"
            >
              Upload File
            </button>
          </div>
        </div>
        <div className="mt-6 flex justify-center">
          <table className="shadow-lg w-full max-w-2xl border-collapse bg-white rounded-lg shadow overflow-hidden">
            <tbody>
              <tr className="border-b border-gray-300">
                <th className="px-4 py-3 text-left text-gray-600 font-medium w-1/3">
                  File Name
                </th>
                <td className="px-4 py-3 text-gray-800">
                  {file?.name || filename || ""}
                </td>
              </tr>

              <tr className="border-b border-gray-300">
                <th className="px-4 py-3 text-left text-gray-600 font-medium">
                  Total Records
                </th>
                <td className="px-4 py-3">
                  {importStatus?.total || total_records || 0}
                </td>
              </tr>

              <tr className="border-b border-gray-300">
                <th className="px-4 py-3 text-left text-gray-600 font-medium">
                  Imported Records
                </th>
                <td className="px-4 py-3 text-green-600 font-medium">
                  {importStatus?.imported || imported_records || 0}
                </td>
              </tr>

              <tr className="border-b border-gray-300">
                <th className="px-4 py-3 text-left text-gray-600 font-medium">
                  Updated Records
                </th>
                <td className="px-4 py-3 text-green-600 font-medium">
                  {importStatus?.updated || updated_records || 0}
                </td>
              </tr>

              <tr className="border-b border-gray-300">
                <th className="px-4 py-3 text-left text-gray-600 font-medium">
                  Error Records
                </th>
                <td className="px-4 py-3 text-red-600 font-medium">
                  {importStatus?.errors || error || 0}
                </td>
              </tr>

              {isPercentageError && (
                <>
                  <tr className="border-b border-gray-300">
                    <th className="px-4 py-3 text-left text-gray-600 font-medium">
                      Progress
                    </th>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-green-500 rounded-full"
                            style={{
                              width: `${importStatus?.percentage || 0}%`,
                            }}
                          />
                        </div>
                        <span className="text-sm">
                          {importStatus?.percentage || 0}%
                        </span>
                      </div>
                    </td>
                  </tr>

                  <tr className="border-b border-gray-300">
                    <th className="px-4 py-3 text-left text-gray-600 font-medium">
                      Error Progress
                    </th>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-red-500 rounded-full"
                            style={{
                              width: `${importStatus?.error_percentage || 0}%`,
                            }}
                          />
                        </div>
                        <span className="text-sm">
                          {importStatus?.error_percentage || 0}%
                        </span>
                      </div>
                    </td>
                  </tr>
                </>
              )}

              <tr>
                <th className="px-4 py-3 text-left text-gray-600 font-medium">
                  Status
                </th>
                <td className="px-4 py-3">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                    {(importStatus &&
                      importStatus?.status?.charAt(0).toUpperCase() +
                        importStatus?.status?.slice(1)) ||
                      status?.charAt(0).toUpperCase() + status?.slice(1) ||
                      "Pending"}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex justify-center gap-3 mt-6">
          <button
            type="button"
            onClick={handleClose}
            className="px-8 py-2 rounded bg-red-600 hover:bg-red-700 text-white transition cursor-pointer"
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImportPopup;
