import React from 'react';
import groupService from '../../services/groupService';
import { UserMinus, Crown, ShieldAlert } from 'lucide-react';

const MemberList = ({ members, isCreator, groupId, onMemberRemoved }) => {
  const handleRemoveMember = async (profileId, email) => {
    if (window.confirm(`Are you sure you want to remove ${email} from the group?`)) {
      try {
        await groupService.removeMember(groupId, profileId);
        await groupService.logActivity(groupId, `removed ${email} from the group`);
        onMemberRemoved();
      } catch (err) {
        alert(err.message || 'Failed to remove member');
      }
    }
  };

  return (
    <div>
      <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center justify-between">
        <span>Group Members</span>
        <span className="bg-slate-100 text-slate-600 font-semibold text-xs px-2.5 py-1 rounded-full">
          {members.length}
        </span>
      </h3>
      
      <div className="divide-y divide-slate-100 max-h-[450px] overflow-y-auto pr-1">
        {members.map((member) => (
          <div key={member.profile_id} className="flex items-center justify-between py-3 group">
            <div className="flex items-center gap-3">
              {member.profiles?.avatar_url ? (
                <img 
                  src={member.profiles.avatar_url} 
                  alt={member.profiles.full_name || member.profiles.email} 
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-100"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 text-white font-bold flex items-center justify-center text-sm shadow-sm">
                  {(member.profiles?.full_name || member.profiles?.email || 'M').charAt(0).toUpperCase()}
                </div>
              )}
              
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-slate-800 flex items-center gap-1">
                  {member.profiles?.full_name || 'Anonymous Traveler'}
                  {member.role === 'creator' && (
                    <Crown size={14} className="text-amber-500 fill-amber-500" title="Group Creator" />
                  )}
                </span>
                <span className="text-xs text-slate-400 truncate max-w-[160px]">
                  {member.profiles?.email}
                </span>
              </div>
            </div>

            {/* Display Actions */}
            {isCreator && member.role !== 'creator' && (
              <button
                onClick={() => handleRemoveMember(member.profile_id, member.profiles?.email)}
                className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-red-50 transition"
                title="Remove Member"
              >
                <UserMinus size={16} />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemberList;