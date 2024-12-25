import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users, MessageCircle } from 'lucide-react';
import { Tour } from '../../types';
import { Card } from '../ui/Card';

interface TourCardProps {
  tour: Tour;
}

export function TourCard({ tour }: TourCardProps) {
  const handleBooking = () => {
    const message = `Hi, I'm interested in the ${tour.title} tour.\n\nDetails:\nDuration: ${tour.duration}\nLocation: ${tour.location}\n\nPlease provide more information about upcoming dates.`;
    window.open(`https://wa.me/+919876543210?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <Card className="group cursor-pointer overflow-hidden">
      <div className="relative">
        <img 
          src={tour.imageUrl} 
          alt={tour.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 text-sm rounded">
          LOYALTY200
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{tour.title}</h3>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            {tour.duration}
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin className="w-4 h-4 mr-2" />
            {tour.location}
          </div>
          <div className="flex items-center text-gray-600">
            <Users className="w-4 h-4 mr-2" />
            Next batch: {new Date().toLocaleDateString()}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div>
            <span className="text-2xl font-bold text-blue-600">₹{tour.price}</span>
          </div>
           <Link 
            to={`/tours/${tour.id}`}
            className="bg-white text-gray-800 px-4 py-2 rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
          >
            View Details
          </Link>
          <button
            onClick={handleBooking}
            className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 flex items-center"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Book Now
          </button>
        </div>
      </div>
    </Card>
  );
}
