import { motion } from "framer-motion";

interface DialogProps {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel: () => void;
  type?: 'warning' | 'confirm';
  className?: string;
}

export function Dialog({ 
  title, 
  message, 
  confirmText = "Tamam",
  cancelText = "İptal",
  onConfirm,
  onCancel,
  type = 'warning',
  className
}: DialogProps) {
  return (
    <div className={`fixed inset-0 bg-black/50 flex items-center justify-center p-4 ${className}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-zinc-900 rounded-xl p-6 max-w-md w-full"
      >
        <h3 className="text-xl font-semibold text-white mb-4">{title}</h3>
        <p className="text-zinc-300 mb-6">{message}</p>
        <div className="flex justify-end gap-3">
          {type === 'confirm' && (
            <button
              onClick={onCancel}
              className="px-4 py-2 text-zinc-300 hover:text-white transition-colors"
            >
              {cancelText}
            </button>
          )}
          <button
            onClick={type === 'confirm' ? onConfirm : onCancel}
            className={`px-4 py-2 rounded-lg transition-colors ${
              type === 'warning' 
                ? 'bg-blue-600 hover:bg-blue-700' 
                : 'bg-green-600 hover:bg-green-700'
            } text-white`}
          >
            {confirmText}
          </button>
        </div>
      </motion.div>
    </div>
  );
} 