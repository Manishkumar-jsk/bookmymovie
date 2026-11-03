import { useLazyDownloadEventsDataQuery } from "@/app/store/api/eventsApi";
import React from "react";

interface ExportPopupProps {
  isExportPopupOpen: boolean;
  onClose: () => void;
}

const ExportPopup = ({ isExportPopupOpen, onClose }: ExportPopupProps) => {
  const [downloadEventsData] = useLazyDownloadEventsDataQuery();

  const downloadEmpty = () => {
    const link = document.createElement("a");
    link.href = "/assets/event_data_template.csv";
    const date = new Date();
    const template = `${date.getDate()}_${date.getMonth()}_${date.getFullYear()}`;
    link.download = `event_data_template_${template}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadCSV = async () => {
    try {
      const blob = await downloadEventsData({}).unwrap();

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = "events_data.csv";

      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("CSV download failed:", error);
    }
  };
  if (!isExportPopupOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-3xl w-full min-h-[400px] p-6 shadow-lg relative max-h-[90vh] overflow-y-auto flex flex-col">
        <h2 className="text-xl font-semibold pb-[10px] border-b">Export</h2>

        {/* Main Content */}
        <div className="flex-1 content-center">
          <div className="flex justify-center gap-3">
            <button
              type="button"
              onClick={downloadEmpty}
              className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white transition cursor-pointer"
            >
              Empty
            </button>

            <button
              type="button"
              onClick={() => downloadCSV()}
              className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-700 text-white transition cursor-pointer"
            >
              With Data
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-center border-t pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-8 py-2 rounded bg-red-600 hover:bg-red-700 text-white transition cursor-pointer"
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExportPopup;
