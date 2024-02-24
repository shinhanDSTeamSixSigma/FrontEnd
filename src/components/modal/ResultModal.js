import { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export default function ResultModal({ title, content, callbackFnc }) {
    return (
        <div
            className={`overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
            onClick={() => {
                if (callbackFnc) {
                    callbackFnc();
                }
            }}
        >
            <div className="relative p-4 w-full max-w-md max-h-full mt-20">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="p-4 md:p-5 text-center">
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            {title} - {content}
                        </h3>
                        <button
                            data-modal-hide="popup-modal"
                            type="button"
                            className="text-white bg-[#80BCBD] hover:bg-[#AAD9BB] focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                            onClick={() => {
                                if (callbackFnc) {
                                    callbackFnc();
                                }
                            }}
                        >
                            확인
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
