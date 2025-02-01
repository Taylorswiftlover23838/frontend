import React from 'react'
import { ImExit } from "react-icons/im";

function RulesModal({ closeModal }) {
    return (
        <div>
            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50 px-4 sm:px-6 md:px-8">
                <div className="bg-white p-8 rounded-lg w-full max-w-lg relative animate-drop-from-top">
                    <button
                        onClick={closeModal}
                        className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-gray-800 transition-colors"
                    >
                        <ImExit />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default RulesModal
