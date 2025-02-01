import React from 'react';
import { FaBook } from "react-icons/fa6";
import { GiClover } from "react-icons/gi";
import useModalStore from "../utils/ZustandStore/useModalStore";

function FairnessFooter() {
    const { openFairnessModal, openRulesModal } = useModalStore();

    return (
        <div className="w-full flex flex-col items-center mt-auto">
            <div className="h-px w-full bg-gray-500 mb-4"></div>

            <div className="flex gap-6 justify-center">
                <div className="flex flex-col items-center">
                    <GiClover
                        onClick={openFairnessModal}
                        className="cursor-pointer text-gray-300 text-2xl hover:text-gray-100 transition"
                        aria-label="Open Fairness Modal"
                    />
                    <p className="text-gray-300 text-sm">Fairness</p>
                </div>
                <div className="flex flex-col items-center">
                    <FaBook
                        onClick={openRulesModal}
                        className="cursor-pointer text-gray-300 text-2xl hover:text-gray-100 transition"
                        aria-label="Open Rules Modal"
                    />
                    <p className="text-gray-300 text-sm">Rules</p>
                </div>
            </div>
        </div>
    );
}

export default FairnessFooter;
