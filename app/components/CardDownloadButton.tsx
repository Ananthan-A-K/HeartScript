'use client';

import React, { useState } from 'react';
import html2canvas from 'html2canvas';

interface CardDownloadButtonProps {
  cardElementId: string;
  cardTitle?: string;
}

export const CardDownloadButton: React.FC<CardDownloadButtonProps> = ({
  cardElementId,
  cardTitle = 'valentine-card',
}) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadComplete, setDownloadComplete] = useState(false);

  const handleDownload = async (format: 'png' | 'jpeg') => {
    setIsDownloading(true);
    setDownloadComplete(false);

    try {
      const cardElement = document.getElementById(cardElementId);

      if (!cardElement) {
        throw new Error('Card element not found');
      }

      const canvas = await html2canvas(cardElement, {
        scale: 3,
        useCORS: true,
        backgroundColor: null,
        logging: false,
        imageTimeout: 0,
      });

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            throw new Error('Failed to create image');
          }

          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          const timestamp = new Date().toISOString().split('T')[0];

          link.download = `${cardTitle}-${timestamp}.${format}`;
          link.href = url;
          link.click();

          URL.revokeObjectURL(url);

          setDownloadComplete(true);

          setTimeout(() => {
            setIsDownloading(false);
            setDownloadComplete(false);
          }, 2000);
        },
        format === 'png' ? 'image/png' : 'image/jpeg',
        0.95
      );
    } catch (error) {
      console.error('Download failed:', error);
      setIsDownloading(false);
      alert('Failed to download card. Please try again.');
    }
  };

  return (
    <div className="download-container">
      <div className="love-letter-seal">

        <div className={`wax-seal ${downloadComplete ? 'sealed' : ''}`}>
          <svg
            viewBox="0 0 100 100"
            className="seal-stamp"
            style={{
              filter: downloadComplete ? 'none' : 'grayscale(0.3)',
            }}
          >
            <circle cx="50" cy="50" r="48" fill="#8B1538" opacity="0.9" />
            <circle cx="50" cy="50" r="45" fill="#A01D48" />

            <path
              d="M50 65 Q35 55 35 45 Q35 35 45 35 Q50 40 50 40 Q50 40 55 35 Q65 35 65 45 Q65 55 50 65"
              fill="#8B1538"
              stroke="#6B0F2A"
              strokeWidth="1"
            />

            <ellipse cx="30" cy="90" rx="8" ry="4" fill="#8B1538" opacity="0.6" />
            <ellipse cx="70" cy="88" rx="6" ry="3" fill="#8B1538" opacity="0.6" />
            <ellipse cx="50" cy="92" rx="7" ry="4" fill="#8B1538" opacity="0.6" />
          </svg>

          {downloadComplete && (
            <div className="checkmark-overlay">
              <svg viewBox="0 0 52 52" className="checkmark">
                <circle cx="26" cy="26" r="25" fill="none" />
                <path fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
              </svg>
            </div>
          )}
        </div>

        <div className="stamp-buttons">
          <button
            onClick={() => handleDownload('png')}
            disabled={isDownloading}
            className="stamp-btn png-stamp"
            aria-label="Download as PNG"
          >
            <div className="stamp-border">
              <div className="stamp-content">
                <span className="stamp-text">PNG</span>
                <div className="postmark">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                </div>
              </div>
            </div>
          </button>

          <button
            onClick={() => handleDownload('jpeg')}
            disabled={isDownloading}
            className="stamp-btn jpeg-stamp"
            aria-label="Download as JPEG"
          >
            <div className="stamp-border">
              <div className="stamp-content">
                <span className="stamp-text">JPEG</span>
                <div className="postmark">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                </div>
              </div>
            </div>
          </button>
        </div>

        {/* Paper texture overlay */}
        <div className="paper-texture" aria-hidden="true"></div>

        {/* Ribbon decoration */}
        <div className="ribbon-decoration">
          <svg viewBox="0 0 200 30" className="ribbon">
            <path d="M0,15 Q50,5 100,15 T200,15" stroke="#C4969B" strokeWidth="8" fill="none" opacity="0.6"/>
            <path d="M0,15 Q50,25 100,15 T200,15" stroke="#D4A6AB" strokeWidth="6" fill="none" opacity="0.4"/>
          </svg>
        </div>

        {/* Loading/Success message */}
        {(isDownloading || downloadComplete) && (
          <div className="download-message">
            {isDownloading && !downloadComplete && (
              <p className="message-text">
                <span className="heart-pulse">❤</span> Sealing your love letter...
              </p>
            )}
            {downloadComplete && (
              <p className="message-text success">
                <span className="sparkle">✨</span> Card sealed & delivered!
              </p>
            )}
          </div>
        )}

      </div>

      <style jsx>{`
        .download-container {
          padding: 2rem;
          text-align: center;
        }

        .love-letter-seal {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
          padding: 2.5rem;
          background: linear-gradient(
            135deg,
            #FFF5F7 0%,
            #FFE8EC 50%,
            #FFF5F7 100%
          );
          border-radius: 12px;
          box-shadow: 
            0 8px 16px rgba(139, 21, 56, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.8);
          border: 1px solid rgba(196, 150, 155, 0.3);
          overflow: hidden;
        }

        .paper-texture {
          position: absolute;
          inset: 0;
          background-image: 
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(139, 21, 56, 0.02) 2px,
              rgba(139, 21, 56, 0.02) 4px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 2px,
              rgba(139, 21, 56, 0.02) 2px,
              rgba(139, 21, 56, 0.02) 4px
            );
          pointer-events: none;
          opacity: 0.5;
        }

        .ribbon-decoration {
          position: absolute;
          bottom: -10px;
          left: 0;
          right: 0;
          pointer-events: none;
        }

        .ribbon {
          width: 100%;
          height: 30px;
        }

        .download-message {
          min-height: 32px;
          text-align: center;
          margin-top: 1rem;
        }

        .message-text {
          margin: 0;
          font-family: 'Georgia', serif;
          font-size: 1rem;
          color: #8B1538;
          font-style: italic;
          animation: fadeInUp 0.4s ease-out;
        }

        .message-text.success {
          color: #2D7A2C;
          font-weight: 500;
        }

        .heart-pulse {
          display: inline-block;
          animation: pulse 1s ease-in-out infinite;
        }

        .sparkle {
          display: inline-block;
          animation: sparkle 0.6s ease-in-out;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }

        @keyframes sparkle {
          0%, 100% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.3) rotate(180deg); }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default CardDownloadButton;