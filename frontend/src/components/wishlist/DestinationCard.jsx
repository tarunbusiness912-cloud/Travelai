import React from 'react';
import { MapPin, Trash2, CheckCircle2, Circle } from 'lucide-react';

const DestinationCard = ({ item, onToggleVisited, onDelete }) => {
  return (
    <div className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden shadow-sm group ${item.is_visited ? 'border-emerald-100 bg-emerald-50/10' : 'border-slate-100 hover:border-slate-200 hover:shadow-md'}`}>
      <div className="relative h-48 overflow-hidden">
        <img 
          src={item.image_url} 
          alt={item.destination_name} 
          className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${item.is_visited ? 'grayscale-[40%]' : ''}`}
        />
        <div className="absolute top-3 right-3 flex gap-1.5">
          <button
            onClick={() => onToggleVisited(item.id, item.is_visited)}
            className={`p-2 rounded-xl backdrop-blur-md transition shadow-sm ${item.is_visited ? 'bg-emerald-500 text-white' : 'bg-white/90 text-slate-600 hover:bg-white hover:text-indigo-600'}`}
            title={item.is_visited ? 'Mark as Unvisited' : 'Mark as Visited'}
          >
            {item.is_visited ? <CheckCircle2 size={16} /> : <Circle size={16} />}
          </button>
          <button
            onClick={() => onDelete(item.id)}
            className="p-2 rounded-xl bg-white/90 backdrop-blur-md text-slate-600 hover:bg-red-50 hover:text-red-600 transition shadow-sm"
            title="Remove from Wishlist"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className="p-5 space-y-2">
        <div className="flex items-center gap-1 text-xs font-semibold text-indigo-600 uppercase tracking-wider">
          <MapPin size={12} />
          <span>{item.location_country}</span>
        </div>
        <h4 className={`text-lg font-bold tracking-tight text-slate-900 ${item.is_visited ? 'line-through text-slate-400' : ''}`}>
          {item.destination_name}
        </h4>
        {item.notes && (
          <p className="text-sm text-slate-500 line-clamp-2 pt-1 font-normal bg-slate-50 p-2 rounded-lg border border-slate-100/50">
            {item.notes}
          </p>
        )}
      </div>
    </div>
  );
};

export default DestinationCard;