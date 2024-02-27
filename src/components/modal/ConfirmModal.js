import React from 'react';

const ResultModal = ({ title, content, confirmText, cancelText, onConfirm, onCancel }) => {
    return (
        <div className={`overflow-y-auto overflow-x-hidden fixed top-0 right-0 bottom-0 left-0 z-50 flex justify-center items-center`} onClick={onCancel}>
            <div className="relative p-4 w-full max-w-md">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700" onClick={(e) => e.stopPropagation()}>
                    <div className="p-4 md:p-5 text-center">
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            {title} {content}
                        </h3>
                        <div className="flex justify-center gap-4">
                            <button
                                data-modal-hide="popup-modal"
                                type="button"
                                className="text-white bg-[#80BCBD] hover:bg-[#AAD9BB] focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                                onClick={onConfirm}
                            >
                                {confirmText || '확인'}
                            </button>
                            <button
                                data-modal-hide="popup-modal"
                                type="button"
                                className="text-white bg-gray-400 hover:bg-gray-500 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                                onClick={onCancel}
                            >
                                {cancelText || '취소'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResultModal;
