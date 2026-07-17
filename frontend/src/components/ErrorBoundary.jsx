import React from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, message: '' };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, message: error?.message || 'Something went wrong.' };
  }

  componentDidCatch(error, info) {
    console.error('TravelOS render failure', error, info);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="min-h-screen bg-[#0b0c10] p-6 text-white flex items-center justify-center">
        <div className="max-w-lg rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/30 backdrop-blur-xl">
          <div className="h-12 w-12 rounded-xl border border-amber-300/30 bg-amber-300/10 text-amber-200 flex items-center justify-center">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <h1 className="mt-6 text-2xl font-black tracking-tight">TravelOS paused this screen</h1>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            A component failed to render, so the shell caught it before the app broke completely.
          </p>
          <p className="mt-4 rounded-xl border border-white/10 bg-black/20 p-3 text-xs text-slate-300">
            {this.state.message}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-slate-950 transition hover:bg-amber-100"
          >
            <RotateCcw className="h-4 w-4" />
            Reload workspace
          </button>
        </div>
      </div>
    );
  }
}

export default ErrorBoundary;
