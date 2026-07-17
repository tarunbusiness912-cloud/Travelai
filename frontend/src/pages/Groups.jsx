import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, BadgeCheck, Plus, Search, Users } from 'lucide-react';
import toast from 'react-hot-toast';
import { getGroups, requestToJoinGroup } from '../services/api';

export default function Groups() {
  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    getGroups()
      .then(({ data }) => setGroups(Array.isArray(data) ? data : []))
      .catch(() => toast.error('Failed to load shared squads'))
      .finally(() => setLoading(false));
  }, []);

  const filteredGroups = useMemo(
    () => groups.filter((group) => `${group.name} ${group.description} ${group.destination}`.toLowerCase().includes(searchQuery.toLowerCase())),
    [groups, searchQuery]
  );

  const handleJoin = async (event, groupId) => {
    event.stopPropagation();
    try {
      await requestToJoinGroup(groupId);
      toast.success('Join request sent');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Could not request to join');
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-200/20 bg-amber-200/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-amber-100">
            <Users className="h-3.5 w-3.5" />
            Group Squads
          </span>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-white">Shared squad packages</h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">
            Browse friend squads and verified conductor packages built for solo travelers with tight Indian travel budgets.
          </p>
        </div>
        <button onClick={() => navigate('/dashboard/create-group')} className="inline-flex items-center gap-2 rounded-xl bg-amber-200 px-5 py-3 text-sm font-black text-slate-950">
          <Plus className="h-4 w-4" />
          Create squad
        </button>
      </div>

      <div className="glass-panel rounded-2xl p-4">
        <div className="relative max-w-xl">
          <Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
          <input
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search squads, destinations, conductors..."
            className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-12 pr-4 text-sm text-white placeholder:text-slate-500"
          />
        </div>
      </div>

      {loading ? (
        <div className="glass-panel rounded-2xl p-8 text-center font-bold text-slate-200">Retrieving squads...</div>
      ) : filteredGroups.length === 0 ? (
        <div className="glass-panel rounded-2xl p-10 text-center font-bold text-slate-300">No squads match this search.</div>
      ) : (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {filteredGroups.map((group, index) => (
            <motion.article
              key={group.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04 }}
              onClick={() => navigate(`/dashboard/groups/${group.id}`)}
              className="glass-panel cursor-pointer rounded-2xl p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-black tracking-tight text-white">{group.name}</h2>
                    {group.packageType === 'conductor' && <BadgeCheck className="h-5 w-5 text-amber-100" />}
                  </div>
                  <p className="mt-1 text-sm font-bold text-amber-100">{group.destination || 'Destination flexible'}</p>
                </div>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-black text-slate-200">
                  {group.members?.length || group.members || 1}/{group.maxMembers || 8}
                </span>
              </div>

              <p className="mt-4 text-sm leading-6 text-slate-300">{group.description || 'A shared planning workspace for budgets and routes.'}</p>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Fixed budget</p>
                  <p className="text-2xl font-black text-amber-100">Rs {Number(group.budget || 0).toLocaleString('en-IN')}</p>
                </div>
                {group.packageType === 'conductor' ? (
                  <button onClick={(event) => handleJoin(event, group.id)} className="rounded-xl bg-amber-200 px-4 py-3 text-sm font-black text-slate-950">
                    Request to join
                  </button>
                ) : (
                  <button className="inline-flex items-center gap-2 text-sm font-black text-amber-100">
                    Enter workspace <ArrowRight className="h-4 w-4" />
                  </button>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      )}
    </div>
  );
}
