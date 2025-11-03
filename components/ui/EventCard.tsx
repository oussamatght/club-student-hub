import { Calendar, MapPin } from 'lucide-react';
import { Event } from '../../app/types';
const EventCard = ({ event }: { event: Event }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition-shadow cursor-pointer">
      <h3 className="text-lg font-bold mb-1">{event.eventName}</h3>
      <p className="text-gray-600 text-sm mb-2 line-clamp-2">{event.eventDescription}</p>
      <div className="flex items-center gap-4 text-xs text-gray-500">
        <span className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          {event.eventStartDate && new Date(event.eventStartDate).toLocaleDateString()}
        </span>
        <span className="flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          {event.eventLocation}
        </span>
      </div>
    </div>
  );
};

export default EventCard;