const CustomMessageBox = ({
  message,
  cancleMessage,
  okMessage,
  onClose,
  onConfirm,
}: {
  message: string;
  cancleMessage: string;
  okMessage: string;
  onClose: () => void;
  onConfirm: () => void;
}) => {
  return (
    <>
      {/* Overlay z niższym z-index */}
      <div className="fixed inset-0 backdrop-blur-md z-20" />
      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-30 pointer-events-none">
        <div className="bg-white rounded-xl shadow-lg p-6 w-96 pointer-events-auto">
          <h2 className="text-xl font-bold mb-4">Informacja</h2>
          <p className="mb-6">{message}</p>
          <div className="flex justify-end gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
            >
              {cancleMessage}
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700 transition"
            >
              {okMessage}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default CustomMessageBox;
