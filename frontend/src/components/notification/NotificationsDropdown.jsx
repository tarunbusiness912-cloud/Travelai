import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import notificationService from '../../services/notificationService'; 
import { Bell, Loader2 } from 'lucide-react';

const NotificationDropdown = () => {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const unreadCount = notifications.filter(n => !n.is_read).length;

  useEffect(() => {
    fetchNotifications();
    const subscription = notificationService.subscribeToNotifications((newNotification) => {
      setNotifications(prev => [newNotification, ...prev]);
    });

    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      if (subscription) subscription.unsubscribe();
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const data = await notificationService.getNotifications();
      setNotifications(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkRead = async (id, link) => {
    try {
      await notificationService.markAsRead(id);
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
      setIsOpen(false);
      if (link) navigate(link);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={() => setIsOpen(!isOpen)} className="relative p-2 text-slate-500 hover:text-slate-800 rounded-xl hover:bg-slate-100 transition">
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 h-4 w-4 rounded-full bg-rose-500 text-[10px] font-bold text-white flex items-center justify-center ring-2 ring-white">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 rounded-2xl border border-slate-100 bg-white p-2 shadow-xl z-50">
          <div className="px-3 py-2 border-b border-slate-100 text-sm font-bold text-slate-800">Notifications</div>
          <div className="max-h-64 overflow-y-auto mt-1">
            {loading && notifications.length === 0 ? (
              <div className="flex justify-center py-4"><Loader2 className="animate-spin text-indigo-600" size={16} /></div>
            ) : notifications.length === 0 ? (
              <div className="text-center py-6 text-xs text-slate-400">No new notifications.</div>
            ) : (
              notifications.map(n => (
                <div key={n.id} onClick={() => handleMarkRead(n.id, n.link)} className={`p-3 cursor-pointer rounded-xl ${!n.is_read ? 'bg-indigo-50/40' : ''}`}>
                  <h4 className="text-xs font-bold text-slate-800">{n.title}</h4>
                  <p className="text-[11px] text-slate-500 line-clamp-2">{n.message}</p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;