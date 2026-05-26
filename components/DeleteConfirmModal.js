import React from 'react'
import { AlertTriangle, X } from 'lucide-react';

const DeleteConfirmModal = ({isOpen, onClose, onConfirm}) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-110 flex items-center justify-center p-4">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200"
                onClick={onClose}
            />

            {/* Modal Box */}
            <div className="relative bg-white w-full max-w-sm rounded-4xl shadow-2xl p-8 animate-in zoom-in-95 duration-200">
                <div className="flex flex-col items-center text-center">
                    {/* Warning Icon */}
                    <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center mb-6">
                        <AlertTriangle size={32} />
                    </div>

                    <h3 className="text-xl font-black text-slate-900 mb-2">Are you sure?</h3>
                    <p className="text-slate-500 text-sm mb-8">
                        This action cannot be undone. This transaction will be permanently removed from your records.
                    </p>

                    <div className="flex gap-3 w-full">
                        <button
                            onClick={onClose}
                            className="flex-1 px-6 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-100 transition-all cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onConfirm}
                            className="flex-1 px-6 py-3 rounded-xl font-bold text-white bg-rose-500 hover:bg-rose-600 shadow-lg shadow-rose-100 transition-all active:scale-95 cursor-pointer"
                        >
                            Delete
                        </button>
                    </div>
                </div>

                {/* Close "X" Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 text-slate-300 hover:text-slate-500 transition-colors cursor-pointer"
                >
                    <X size={20} />
                </button>
            </div>
        </div>
    )
}

export default DeleteConfirmModal
