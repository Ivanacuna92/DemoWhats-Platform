import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';

function QRSession() {
  const [qrData, setQrData] = useState(null);
  const [qrImage, setQrImage] = useState(null);
  const [status, setStatus] = useState('loading');
  const [isResetting, setIsResetting] = useState(false);

  const fetchQR = async () => {
    try {
      const response = await fetch('/api/session/qr', {
        credentials: 'include'
      });
      const data = await response.json();

      if (data.qr) {
        setQrData(data.qr);
        setStatus('waiting');

        // Generate QR code image
        try {
          const qrImageUrl = await QRCode.toDataURL(data.qr, {
            width: 300,
            margin: 2,
            color: {
              dark: '#000000',
              light: '#ffffff'
            }
          });
          setQrImage(qrImageUrl);
        } catch (err) {
          console.error('Error generating QR image:', err);
        }
      } else {
        setQrData(null);
        setQrImage(null);
        setStatus('connected');
      }
    } catch (error) {
      console.error('Error fetching QR:', error);
      setStatus('error');
    }
  };

  const handleReset = async () => {
    if (isResetting) return;

    if (window.confirm('¿Estás seguro de que quieres reiniciar la sesión de WhatsApp?')) {
      setIsResetting(true);
      setStatus('resetting');

      try {
        const response = await fetch('/api/session/whatsapp-logout', {
          method: 'POST',
          credentials: 'include'
        });
        const data = await response.json();

        if (data.success) {
          setStatus('waiting');
          // Wait 3 seconds before fetching new QR
          setTimeout(fetchQR, 3000);
        } else {
          setStatus('error');
        }
      } catch (error) {
        console.error('Error resetting session:', error);
        setStatus('error');
      } finally {
        setIsResetting(false);
      }
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchQR();

    // Poll every 3 seconds
    const interval = setInterval(fetchQR, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-1 flex items-center justify-center bg-gray-50 p-4 overflow-auto">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg mx-auto my-auto">
        {/* Header */}
        <div className="text-center p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-navetec-primary mb-1">
            Sesión de WhatsApp
          </h1>
          <p className="text-gray-600 text-sm">
            Gestiona la conexión del bot con WhatsApp
          </p>
        </div>

        {/* QR Code Container */}
        <div className="p-8">
          <div className="bg-gray-50 rounded-lg p-6 flex items-center justify-center" style={{ minHeight: '320px' }}>
            {status === 'loading' && (
              <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-navetec-primary mx-auto mb-4"></div>
                <p className="text-gray-600 text-sm">Cargando código QR...</p>
              </div>
            )}

            {status === 'waiting' && qrImage && (
              <div className="text-center">
                <img
                  src={qrImage}
                  alt="QR Code"
                  className="mx-auto rounded-lg mb-3"
                  style={{ width: '256px', height: '256px' }}
                />
                <p className="text-sm text-gray-600">Escanea el código con WhatsApp</p>
              </div>
            )}

            {status === 'waiting' && !qrImage && (
              <div className="text-center">
                <div
                  className="animate-pulse bg-gray-200 rounded-lg mx-auto mb-3"
                  style={{ width: '256px', height: '256px' }}
                ></div>
                <p className="text-gray-600 text-sm">Generando código QR...</p>
              </div>
            )}

            {status === 'connected' && (
              <div className="text-center py-8">
                <div className="text-green-500 mb-4">
                  <svg className="w-20 h-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-xl font-semibold text-gray-800 mb-2">Bot Conectado</p>
                <p className="text-sm text-gray-600">El bot está funcionando correctamente</p>
              </div>
            )}

            {status === 'resetting' && (
              <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-navetec-primary mx-auto mb-4"></div>
                <p className="text-gray-600 text-sm">Reiniciando sesión...</p>
              </div>
            )}

            {status === 'error' && (
              <div className="text-center text-red-600 py-8">
                <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="font-semibold text-lg mb-2">Error de conexión</p>
                <p className="text-sm">No se pudo obtener el código QR</p>
              </div>
            )}
          </div>

          {/* Instructions */}
          {status === 'waiting' && (
            <div className="bg-navetec-secondary-2 border border-navetec-secondary-1 rounded-lg p-4 mt-6 text-sm text-navetec-secondary-4">
              <p className="font-semibold mb-2">Instrucciones:</p>
              <ol className="list-decimal list-inside space-y-1 text-xs leading-relaxed">
                <li>Abre WhatsApp en tu teléfono</li>
                <li>Ve a Configuración → Dispositivos vinculados</li>
                <li>Toca "Vincular dispositivo"</li>
                <li>Escanea este código QR</li>
              </ol>
            </div>
          )}

          {/* Reset Button */}
          <button
            onClick={handleReset}
            disabled={isResetting}
            className="w-full mt-6 bg-navetec-primary text-white py-3 px-4 rounded-lg font-medium hover:bg-opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isResetting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Reiniciando...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>Reiniciar Sesión de WhatsApp</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default QRSession;
