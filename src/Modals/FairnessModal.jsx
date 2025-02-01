import React, { useEffect, useState } from 'react';
import { ImExit } from "react-icons/im";
import api from '../utils/Api/axiosConfig';
import useAuthStore from '../utils/ZustandStore/useAuthStore';

function FairnessModal({ closeModal }) {
    const { loggedIn } = useAuthStore();
    const [seedData, setSeedData] = useState(null);
    const [newClientSeed, setNewClientSeed] = useState("");

    const fetchSeedData = async () => {
        try {
            const response = await api.post('/fairness/get-seed');
            setSeedData(response.data);
        } catch (err) {
            console.error('Error fetching seed:', err);
        }
    };

    const updateSeedData = async () => {
        const body = { newClientSeed }
        try {
            const response = await api.post('/fairness/update-seed', body);
            setSeedData(response.data);
        } catch (err) {
            console.error('Error updating seed:', err);
        }
    };

    useEffect(() => {
        if (loggedIn) {
            fetchSeedData();

        }
    }, [loggedIn]);

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50 px-4 sm:px-6 md:px-8">
            <div className="bg-white p-8 rounded-lg w-full max-w-lg relative animate-drop-from-top">
                <div className="flex justify-center mb-6">
                    <h2 className="text-3xl font-semibold text-gray-800">Fairness</h2>
                </div>
                <button
                    onClick={closeModal}
                    className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-gray-800 transition-colors"
                >
                    <ImExit />
                </button>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Active Client Seed</label>
                        <p className="text-gray-600 bg-gray-100 rounded-lg px-4 py-2 break-words">{seedData?.seed?.clientSeed}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Active Server Seed (Hashed)</label>
                        <p className="text-gray-600 bg-gray-100 rounded-lg px-4 py-2 break-words">{seedData?.seed?.serverSeed}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Total games with pair</label>
                        <p className="text-gray-600 bg-gray-100 rounded-lg px-4 py-2 break-words">{seedData?.seed?.nonce}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">New Client Seed</label>
                        <input
                            type="text"
                            className="block w-full text-gray-800 bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none"
                            placeholder="Enter new client seed"
                            value={newClientSeed}
                            onChange={(e) => setNewClientSeed(e.target.value)}
                        />
                    </div>
                    <button
                        className="bg-blue-500 text-white font-medium py-2 px-4 rounded-lg w-full hover:bg-blue-600 transition-colors"
                        onClick={updateSeedData} 
                    >
                        Change
                    </button>
                </div>
            </div>
        </div>
    );
}

export default FairnessModal;
