import React, { useState } from "react";
import { enqueueSnackbar } from "notistack";

import { IEvent, IEventSelectedOddPair } from "src/interfaces/events";

interface BetSlipProps {
  eventsData: IEvent[];
  selectedEvents: IEventSelectedOddPair[];
}

const BetSlip: React.FC<BetSlipProps> = ({ eventsData, selectedEvents }) => {
  const [money, setMoney] = useState<number>(0);

  const handleMoneyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMoney(parseFloat(e.target.value));
  };

  const calculatePayout = () => {
    if (selectedEvents.length > 0 && money > 0) {
      const selectedOdds = selectedEvents.reduce(
        (acc, curr) =>
          acc *
          eventsData.find((event) => event.event_id === curr.eventId)!.odds[
            curr.oddType
          ],
        1,
      );
      return (selectedOdds * money).toFixed(2);
    }
    return "0.00";
  };

  const handlePlaceBet = () => {
    if (selectedEvents.length === 0) {
      enqueueSnackbar("No events selected", { variant: "error" });
      return;
    }
    if (money <= 0) {
      enqueueSnackbar("Please enter a valid amount", { variant: "error" });
      return;
    }

    enqueueSnackbar("Bet placed successfully", { variant: "success" });
  };

  const totalOdds = selectedEvents.reduce(
    (acc, curr) =>
      acc *
      eventsData.find((event) => event.event_id === curr.eventId)!.odds[
        curr.oddType
      ],
    1,
  );

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Bet Slip</h2>

      {selectedEvents && selectedEvents.length > 0 && (
        <>
          <div className="mb-4">
            <ul className="space-y-2">
              {selectedEvents.map(({ eventId, oddType }) => {
                const foundEvent = eventsData.find(
                  (eventFound) => eventFound.event_id === eventId,
                );
                return foundEvent ? (
                  <li
                    key={eventId}
                    className="flex items-center justify-between text-gray-800"
                  >
                    <span>{foundEvent.event_name}</span>
                    <span>{foundEvent.odds[oddType]}</span>
                  </li>
                ) : null;
              })}
              {selectedEvents.length > 1 && (
                <li className="flex items-center justify-between text-gray-800">
                  <span className="font-bold">Total Odds</span>
                  <span>{totalOdds.toFixed(2)}</span>
                </li>
              )}
            </ul>
          </div>

          <div className="mb-4">
            <label
              htmlFor="money"
              className="block text-sm font-medium text-gray-700"
            >
              Amount to Bet
              <input
                id="money"
                type="number"
                value={money}
                onChange={handleMoneyChange}
                min="0"
                step="0.01"
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 border-gray-300"
              />
            </label>
          </div>

          <div className="text-lg font-bold text-gray-800 mb-4">
            Potential Payout: ${calculatePayout()}
          </div>

          <button
            type="button"
            onClick={handlePlaceBet}
            className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition"
          >
            Place Bet
          </button>
        </>
      )}
    </div>
  );
};

export default BetSlip;
