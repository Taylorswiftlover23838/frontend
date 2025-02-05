import React from 'react'
import { FaQuestionCircle } from "react-icons/fa";
import Header from '../../components/Header';

function TermsOfService() {
    const links = [
        { linkText: "Terms of Service", linkUrl: "/about/terms-of-service" },
        { linkText: "Privacy Policy", linkUrl: "/about/privacy-policy" },
        { linkText: "AML Policy", linkUrl: "/about/aml-policy" },
    ];

    return (
        <>
            <div className="min-h-screen bg-gray-900 px-4 sm:px-6">

                <div className="w-full mt-6">
                    <Header title="Fairness" icon={<FaQuestionCircle />} links={links} />
                </div>


                <div className="w-full max-w-screen-lg mx-auto mt-4 p-6 flex justify-center items-center border-2 border-gray-700 rounded-lg bg-gray-800">

                </div>
            </div>
        </>
    )
}

export default TermsOfService
