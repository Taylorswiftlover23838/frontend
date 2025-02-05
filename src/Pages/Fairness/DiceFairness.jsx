import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { GiClover } from "react-icons/gi";
import useAuthStore from '../../utils/ZustandStore/useAuthStore';
import api from '../../utils/Api/axiosConfig';
import useModalStore from '../../utils/ZustandStore/useModalStore';
import FairnessModal from '../../Modals/FairnessModal';

function DiceFairness() {
  const { loggedIn } = useAuthStore();
  const { openFairnessModal, openLoginModal, isFairnessModalOpen, closeFairnessModal } = useModalStore();

  const links = [
    { linkText: "Dice", linkUrl: "/fairness/dice" },
    { linkText: "BlackJack", linkUrl: "/fairness/blackjack" },
    { linkText: "Mines", linkUrl: "/fairness/mines" },
    { linkText: "Limbo", linkUrl: "/fairness/limbo" },
  ];

  const [diceHistory, setHistoryData] = useState([]);
  const [date, setDate] = useState(new Date().toLocaleDateString("en-CA", { timeZone: "America/New_York" }));
  const [clientSeed, setClientSeed] = useState('');  
  const [seedUpdated, setSeedUpdated] = useState(false);

  const fetchHistory = async () => {
    const body = { date };
    try {
      const response = await api.post('/dice/dice-history', body);
      setHistoryData(response.data.rolls);
      setClientSeed(response.data.clientSeed); 
    } catch (err) {
      console.error('Error fetching history:', err);
    }
  };

  const handleSeedUpdate = () => {
    setSeedUpdated(prev => !prev);  
  };

  useEffect(() => {
    if (loggedIn) {
      fetchHistory();
    }
  }, [loggedIn, date, seedUpdated]);  

  return (
    <>
      <div className="min-h-screen bg-gray-900 px-4 sm:px-6">
        <div className="w-full mt-6">
          <Header title="Fairness" icon={<GiClover />} links={links} />
        </div>

        <div className="w-full max-w-screen-lg mx-auto mt-4 p-6 flex flex-col space-y-6 border-2 border-gray-700 rounded-lg bg-gray-800">
          <div className="p-4 bg-gray-900 text-white rounded-lg">
            <h1 className="text-xl font-bold mb-4">Dice</h1>
            <p className="mb-4">
              Our system generates the result for each card by hashing the
              combination of these 3 inputs:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Client Seed: a random or custom string.</li>
              <li>Server Seed: a SHA-256 hash of 16 random characters.</li>
              <li>Nonce: an integer incremented every time a play is placed or card is dealt.</li>
            </ul>
            <p className="mb-4">
              For independent verification, you may replicate the results of any round by using{" "}
              <span className="text-blue-400 underline">this code</span> and copying the input below.
            </p>
            <p>
              You must generate a new server seed by changing your client seed before you can verify your
              board using the code above. If the seed is purple, that means it is still hashed and not
              verifiable.
            </p>
          </div>

          {loggedIn ? (
            <>
              <div className="p-4 bg-gray-900 text-white rounded-lg flex items-center justify-between">
                <p className=''>
                  Current Client Seed: <span className='text-green-400'>{clientSeed}</span>
                </p>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none" onClick={openFairnessModal}>
                  Change
                </button>
              </div>
              <div className="p-4 bg-gray-900 rounded-lg flex items-center justify-between">
                <p className="text-white">Show Rolls for:</p>
                <input
                  type="date"
                  className="px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              {diceHistory.length > 0 ? (
                <div className="p-4 bg-gray-900 text-white rounded-lg">
                  <h2 className="text-lg font-bold mb-4">Dice History</h2>
                  <table className="w-full text-left table-auto border-collapse border border-gray-700">
                    <thead>
                      <tr className="bg-gray-800 text-white">
                        <th className="p-2 border border-gray-700">Roll</th>
                        <th className="p-2 border border-gray-700">Client Seed</th>
                        <th className="p-2 border border-gray-700">Server Seed</th>
                        <th className="p-2 border border-gray-700">Nonce</th>
                      </tr>
                    </thead>
                    <tbody>
                      {diceHistory.map((entry, index) => (
                        <tr key={index} className="hover:bg-gray-700">
                          <td className="p-2 border border-gray-700">{entry.roll}</td>
                          <td className="p-2 border border-gray-700">{entry.fairness.clientSeed}</td>
                          <td
                            className={`p-2 border border-gray-700 ${entry.fairness.active ? "text-purple-500" : "text-white"
                              }`}
                          >
                            {entry.fairness.serverSeed}
                          </td>
                          <td className="p-2 border border-gray-700">{entry.nonce}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-4 bg-gray-900 text-white rounded-lg">
                  <p>No dice history available. Start rolling!</p>
                </div>
              )}
            </>
          ) : (
            <div className="p-4 bg-gray-900 text-white rounded-lg flex flex-col items-center justify-center space-y-6">
              <p className='text-red-500'>Please log in to replicate your past games</p>
              <button
                className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
                onClick={openLoginModal}
              >
                Log In
              </button>
            </div>
          )}
        </div>
      </div>

      {isFairnessModalOpen && <FairnessModal closeModal={closeFairnessModal} onSeedUpdate={handleSeedUpdate} />}
    </>
  );
}

export default DiceFairness;
