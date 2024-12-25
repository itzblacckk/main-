import React from 'react';
import { Banner } from '../components/ui/Banner';
import { useCollection } from '../hooks/useFirebase';
import { Event } from '../types';

export default function PastEvents() {
  const { data: events, loading, error } = useCollection<Event>('past-events'); // Use 'past-events' collection here

  if (loading) return <div className="p-8 text-center">Loading past events...</div>;
  if (error) return <div className="p-8 text-center text-red-600">Error loading events: {error.message}</div>;

  return (
    <div>
      <Banner
        title="Past Events"
        subtitle="Relive Our Amazing Adventures"
        backgroundImage="https://images.unsplash.com/photo-1527519135413-1e146b552e10?auto=format&fit=crop&q=80"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <div key={event.id} className="bg-white shadow-md rounded-lg overflow-hidden">
              <img
                src={event.imageUrl}
                alt={event.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800">{event.title}</h2>
                <p className="text-sm text-gray-600">{event.date}</p>
                <p className="text-gray-700 mt-2">{event.description}</p>
                <p className="text-gray-700 mt-2">Location: {event.location}</p>
                <p className="text-gray-700 mt-2">Category: {event.category}</p>
                <div className="mt-4 flex flex-wrap">
                  {event.highlights.map((highlight, index) => (
                    <span
                      key={index}
                      className="mr-2 mb-2 px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Registered: {event.registeredCount} / {event.capacity}
                </p>
                <p className="mt-2 text-sm text-gray-500">Price: ${event.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
