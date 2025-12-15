'use client';
import React from 'react';

type Counts = {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
};

export default function StatusCards({
  activeFilter,
  setActiveFilter,
}: {
  activeFilter: 'All' | 'Pending' | 'Approved' | 'Rejected';
  setActiveFilter: (f: 'All' | 'Pending' | 'Approved' | 'Rejected') => void;
}) {
  const [counts, setCounts] = React.useState<Counts | null>(null);
  const [loading, setLoading] = React.useState(false);

  const fetchCounts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/submissions/counts', { cache: 'no-store' });
      if (!res.ok) throw new Error('Failed to load counts');
      const data = await res.json();
      setCounts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchCounts();
    // optional: poll or use web socket for realtime
  }, []);

  return (
    <div className="grid grid-cols-4 gap-4 mb-8">
      <button
        onClick={() => setActiveFilter('All')}
        className={`rounded-3xl p-6 text-center transition-all hover:scale-105 cursor-pointer ${
          activeFilter === 'All' ? 'ring-4 ring-gray-600' : ''
        } bg-gray-900 text-white`}
      >
        <div className="text-4xl font-bold mb-2">{loading ? '—' : counts?.total ?? 0}</div>
        <div className="text-sm font-medium">Total Submissions</div>
      </button>

      <button
        onClick={() => setActiveFilter('Pending')}
        className={`rounded-3xl p-6 text-center transition-all hover:scale-105 cursor-pointer ${
          activeFilter === 'Pending' ? 'ring-4 ring-blue-600' : ''
        } bg-blue-400 text-white`}
      >
        <div className="text-4xl font-bold mb-2">{loading ? '—' : counts?.pending ?? 0}</div>
        <div className="text-sm font-medium">Pending</div>
      </button>

      <button
        onClick={() => setActiveFilter('Approved')}
        className={`rounded-3xl p-6 text-center transition-all hover:scale-105 cursor-pointer ${
          activeFilter === 'Approved' ? 'ring-4 ring-orange-600' : ''
        } bg-orange-400 text-white`}
      >
        <div className="text-4xl font-bold mb-2">{loading ? '—' : counts?.approved ?? 0}</div>
        <div className="text-sm font-medium">Approved</div>
      </button>

      <button
        onClick={() => setActiveFilter('Rejected')}
        className={`rounded-3xl p-6 text-center transition-all hover:scale-105 cursor-pointer ${
          activeFilter === 'Rejected' ? 'ring-4 ring-red-600' : ''
        } bg-red-400 text-white`}
      >
        <div className="text-4xl font-bold mb-2">{loading ? '—' : counts?.rejected ?? 0}</div>
        <div className="text-sm font-medium">Rejected</div>
      </button>
    </div>
  );
}
