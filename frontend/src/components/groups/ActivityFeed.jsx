import React from 'react';
import { User, MessageSquare, PlusCircle } from 'lucide-react';

const ActivityFeed = ({ activities }) => {
  if (!activities || activities.length === 0) {
    return (
      <div className="text-center py-8 text-slate-400 border border-dashed border-slate-200 rounded-xl bg-slate-50/50">
        <MessageSquare className="mx-auto mb-2 opacity-50" size={28} />
        <p className="text-sm">No activity logged in this group yet.</p>
      </div>
    );
  }

  return (
    <div className="flow-root">
      <ul className="-mb-8 max-h-[500px] overflow-y-auto pr-2">
        {activities.map((activity, activityIdx) => (
          <li key={activity.id}>
            <div className="relative pb-8">
              {activityIdx !== activities.length - 1 ? (
                <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-slate-200" aria-hidden="true" />
              ) : null}
              <div className="relative flex space-x-3">
                <div>
                  <span className="h-8 w-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center ring-8 ring-white">
                    <User size={14} className="text-slate-600" />
                  </span>
                </div>
                <div className="flex-1 min-w-0 pt-1.5 flex justify-between space-x-4">
                  <div>
                    <p className="text-sm text-slate-600 font-medium">
                      <span className="font-semibold text-slate-900">
                        {activity.profiles?.full_name || activity.profiles?.email || 'A group member'}
                      </span>{' '}
                      {activity.activity_text}
                    </p>
                  </div>
                  <div className="text-right text-xs whitespace-nowrap text-slate-400 font-normal">
                    <time dateTime={activity.created_at}>
                      {new Date(activity.created_at).toLocaleDateString([], {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </time>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityFeed;