import React, { useState, useEffect } from 'react';
import { X, Mic, MicOff, Activity, AlertCircle } from 'lucide-react';
import { startLiveSession, stopLiveSession } from '../services/liveService';

interface VoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const VoiceModal: React.FC<VoiceModalProps> = ({ isOpen, onClose }) => {
  const [status, setStatus] = useState<'idle' | 'connecting' | 'active' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (isOpen) {
      handleStartSession();
    } else {
      handleStopSession();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleStartSession = async () => {
    setStatus('connecting');
    setErrorMessage('');
    
    await startLiveSession(
      () => setStatus('active'),
      () => {
         // Disconnect callback
         if (status !== 'error') setStatus('idle'); 
      },
      (err) => {
        console.error(err);
        setStatus('error');
        setErrorMessage("Gagal terhubung ke layanan suara. Pastikan izin mikrofon aktif.");
      }
    );
  };

  const handleStopSession = async () => {
    await stopLiveSession();
    setStatus('idle');
  };

  const handleClose = async () => {
    await handleStopSession();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black-900/80 backdrop-blur-md">
      <div className="bg-black-800 w-full max-w-sm rounded-3xl shadow-2xl border border-gray-700 p-8 flex flex-col items-center relative overflow-hidden">
        
        {/* Decorative Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <button 
          onClick={handleClose} 
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        <h3 className="text-white font-bold text-xl mb-2 text-center">Percakapan Langsung</h3>
        <p className="text-gray-400 text-sm text-center mb-8">
          {status === 'connecting' && "Menghubungkan..."}
          {status === 'active' && "Silakan berbicara, saya mendengarkan."}
          {status === 'error' && "Terjadi Kesalahan."}
        </p>

        {/* Visualizer / Status Indicator */}
        <div className="relative mb-8">
           <div className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-500 ${
             status === 'active' ? 'bg-gold-500/20 shadow-[0_0_30px_rgba(212,175,55,0.3)] animate-pulse' : 
             status === 'error' ? 'bg-red-500/20' : 'bg-gray-700/50'
           }`}>
              {status === 'active' ? (
                <div className="flex gap-1 items-center h-8">
                   <span className="w-1 h-4 bg-gold-500 animate-[bounce_1s_infinite]"></span>
                   <span className="w-1 h-8 bg-gold-500 animate-[bounce_1.2s_infinite]"></span>
                   <span className="w-1 h-6 bg-gold-500 animate-[bounce_0.8s_infinite]"></span>
                   <span className="w-1 h-8 bg-gold-500 animate-[bounce_1.1s_infinite]"></span>
                   <span className="w-1 h-4 bg-gold-500 animate-[bounce_0.9s_infinite]"></span>
                </div>
              ) : status === 'error' ? (
                <AlertCircle className="text-red-500" size={48} />
              ) : status === 'connecting' ? (
                <Activity className="text-gold-500 animate-spin" size={48} />
              ) : (
                <MicOff className="text-gray-500" size={48} />
              )}
           </div>
        </div>

        {status === 'error' && (
           <div className="text-red-400 text-center text-sm mb-4 bg-red-900/20 p-3 rounded-lg border border-red-900/50">
             {errorMessage}
           </div>
        )}

        {status === 'error' ? (
           <button 
             onClick={handleStartSession}
             className="px-8 py-3 bg-white text-black-900 rounded-full font-bold hover:bg-gray-200 transition-colors"
           >
             Coba Lagi
           </button>
        ) : (
          <button 
            onClick={handleClose}
            className="px-8 py-3 bg-red-500/10 text-red-400 border border-red-500/50 rounded-full font-medium hover:bg-red-500 hover:text-white transition-colors flex items-center gap-2"
          >
            <MicOff size={18} /> Akhiri Sesi
          </button>
        )}

      </div>
    </div>
  );
};

export default VoiceModal;