const DeleteConfirmModal = ({ onConfirm, onCancel }) => (
  <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onCancel}>
    <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-xl p-6 w-full max-w-sm text-center">
      <h3 className="text-lg font-bold mb-2">Delete Product?</h3>
      <p className="text-gray-500 mb-6">This action cannot be undone.</p>
      <div className="flex gap-3">
        <button onClick={onCancel} className="flex-1 border rounded-lg py-2">Cancel</button>
        <button onClick={onConfirm} className="flex-1 bg-red-600 text-white rounded-lg py-2">Delete</button>
      </div>
    </div>
  </div>
);

export default DeleteConfirmModal;