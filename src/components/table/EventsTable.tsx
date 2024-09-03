import { IEvent, IEventSelectedOddPair } from "src/interfaces/events";

interface EventsTableProps {
  eventsData: IEvent[];
  selectedEvents: IEventSelectedOddPair[];
  selectOdd: (eventId: string, odd: IEventSelectedOddPair["oddType"]) => void;
}

const buttonClassNames =
  "px-3 py-1 text-white font-semibold rounded-md hover:opacity-90 transition w-18 text-center";

const EventsTable: React.FC<EventsTableProps> = ({
  eventsData,
  selectedEvents,
  selectOdd,
}) => {
  if (eventsData.length === 0) {
    return <p className="text-center text-gray-600">No events available</p>;
  }

  const isSelected = (
    event: IEvent,
    oddType: IEventSelectedOddPair["oddType"],
  ) =>
    selectedEvents.some(
      (selectedEvent) =>
        selectedEvent.eventId === event.event_id &&
        selectedEvent.oddType === oddType,
    );

  return (
    <table className="w-full bg-white border border-gray-200 rounded-lg shadow-md">
      <thead className="bg-gray-100 border-b border-gray-300">
        <tr>
          <th className="py-3 px-4 text-left text-gray-600">Match</th>
          <th className="py-3 px-4 text-center text-gray-600">Win</th>
          <th className="py-3 px-4 text-center text-gray-600">Draw</th>
          <th className="py-3 px-4 text-center text-gray-600">Lose</th>
        </tr>
      </thead>
      <tbody>
        {eventsData.map((match) => (
          <tr
            key={match.event_id}
            className="border-b border-gray-200 hover:bg-gray-50"
          >
            <td className="py-3 px-4 text-gray-800">{match.event_name}</td>
            <td className="py-3 px-4 text-center">
              <button
                type="button"
                className={`bg-green-500 ${buttonClassNames} ${isSelected(match, "win") ? "bg-green-700" : ""}`}
                onClick={() => selectOdd(match.event_id, "win")}
              >
                {match.odds.win.toFixed(2)}
              </button>
            </td>
            <td className="py-3 px-4 text-center">
              <button
                type="button"
                className={`bg-yellow-500 ${buttonClassNames} ${isSelected(match, "draw") ? "bg-yellow-700" : ""}`}
                onClick={() => selectOdd(match.event_id, "draw")}
              >
                {match.odds.draw.toFixed(2)}
              </button>
            </td>
            <td className="py-3 px-4 text-center">
              <button
                type="button"
                className={`bg-red-500 ${buttonClassNames} ${isSelected(match, "lose") ? "bg-red-700" : ""}`}
                onClick={() => selectOdd(match.event_id, "lose")}
              >
                {match.odds.lose.toFixed(2)}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EventsTable;
