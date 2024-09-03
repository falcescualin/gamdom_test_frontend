import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { useRouter } from "src/routes/hooks";

import { getEvents } from "src/api-actions/dashboard";
import { IEventSelectedOddPair } from "src/interfaces/events";

import BetSlip from "src/components/bet-slip/BetSlip";
import EventsTable from "src/components/table/EventsTable";
import { LoadingScreen } from "src/components/loading-screen";

import DashboardError from "./DashboardError";

const DashboardView = () => {
  const { back } = useRouter();
  const [selectedEvents, setSelectedEvents] = useState<IEventSelectedOddPair[]>(
    [],
  );

  const handleSelectOdd = (
    eventId: string,
    oddType: IEventSelectedOddPair["oddType"],
  ) => {
    if (
      selectedEvents.some(
        (event) => event.eventId === eventId && event.oddType === oddType,
      )
    ) {
      setSelectedEvents(
        selectedEvents.filter((event) => event.eventId !== eventId),
      );
      return;
    }

    if (
      selectedEvents.some(
        (event) => event.eventId === eventId && event.oddType !== oddType,
      )
    ) {
      setSelectedEvents(
        selectedEvents.map((event) =>
          event.eventId === eventId ? { eventId, oddType } : event,
        ),
      );
      return;
    }

    setSelectedEvents([
      ...selectedEvents,
      {
        eventId,
        oddType,
      },
    ]);
  };

  const {
    data: eventsData,
    isPending: eventsIsPending,
    isLoading: eventsIsLoading,
    isFetching: eventsIsFetching,
    isRefetching: eventsIsRefetching,
    error: eventsError,
    isError: eventsIsError,
  } = useQuery({
    queryKey: ["events"],
    queryFn: async () => getEvents(),
    retry: false,
    retryOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    refetchIntervalInBackground: false,
  });

  if (
    eventsIsPending ||
    eventsIsLoading ||
    eventsIsFetching ||
    eventsIsRefetching
  ) {
    return <LoadingScreen />;
  }

  if (eventsIsError) {
    return <DashboardError error={eventsError} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="flex items-center justify-between mb-8">
        <button
          type="button"
          onClick={() => back()}
          className="px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-300 transition"
          aria-label="Go back"
        >
          <span className="text-lg">&larr;</span>{" "}
        </button>
        <h1 className="text-3xl font-bold text-gray-900">
          Football Betting Dashboard
        </h1>
      </header>

      <main className="space-y-8">
        <section className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Featured Matches
          </h2>
          {eventsData && (
            <EventsTable
              eventsData={eventsData}
              selectOdd={handleSelectOdd}
              selectedEvents={selectedEvents}
            />
          )}
        </section>

        <div className="mt-8 ">
          {eventsData && (
            <BetSlip eventsData={eventsData} selectedEvents={selectedEvents} />
          )}
        </div>
      </main>
    </div>
  );
};

export default DashboardView;
