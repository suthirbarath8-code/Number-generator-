import React, { useState, useEffect } from 'react';
import { 
  Dices, 
  RotateCcw, 
  Copy, 
  Check, 
  SlidersHorizontal,
  History,
  Trash2,
  Hash
} from 'lucide-react';

export default function App() {
  // 1. State for the generated random number (null initially)
  const [randomNumber, setRandomNumber] = useState(null);

  // 2. States for customizable range
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [errorMessage, setErrorMessage] = useState('');

  // 3. States for user experience enhancements
  const [history, setHistory] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Function to generate random number
  const handleGenerate = () => {
    const minVal = parseInt(min, 10);
    const maxVal = parseInt(max, 10);

    if (isNaN(minVal) || isNaN(maxVal)) {
      setErrorMessage('Please enter valid numeric values for min and max.');
      return;
    }

    if (minVal >= maxVal) {
      setErrorMessage('Minimum value must be strictly less than maximum value.');
      return;
    }

    setErrorMessage('');
    setIsAnimating(true);

    // Calculate random integer inclusive of min and max
    const generated = Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal;

    // Trigger state update
    setTimeout(() => {
      setRandomNumber(generated);
      setHistory((prevHistory) => [
        { 
          id: Date.now(), 
          value: generated, 
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) 
        },
        ...prevHistory.slice(0, 19) // Keep last 20 rolls
      ]);
      setIsAnimating(false);
    }, 150);
  };

  // Reset to initial state
  const handleReset = () => {
    setRandomNumber(null);
    setErrorMessage('');
    setCopied(false);
  };

  // Clear history
  const handleClearHistory = () => {
    setHistory([]);
  };

  // Copy number to clipboard
  const handleCopy = () => {
    if (randomNumber !== null) {
      navigator.clipboard.writeText(randomNumber.toString());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Preset ranges
  const applyPreset = (presetMin, presetMax) => {
    setMin(presetMin);
    setMax(presetMax);
    setErrorMessage('');
  };

  // Keyboard shortcut: Space or Enter to generate
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        handleGenerate();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  return (
    <div className="app-container">
      {/* Soft ambient tint layer to enhance readability */}
      <div className="bg-overlay" aria-hidden="true"></div>

      {/* ========================================================
          Left-Aligned Generator Section
          ======================================================== */}
      <div className="generator-layout-left">
        <main className="main-card generator-left">
          {/* Header */}
          <header className="card-header">
            <h1 className="card-title">Random Number Generator</h1>
            <p className="card-subtitle">
              Generate dynamic numbers within your preferred range instantly.
            </p>
          </header>

          {/* Range Settings Bar */}
          <section className="range-controls-section">
            <div className="range-summary">
              <span className="range-label">
                Current Range: <strong>{min}</strong> to <strong>{max}</strong>
              </span>
              <button 
                className={`toggle-settings-btn ${showSettings ? 'active' : ''}`}
                onClick={() => setShowSettings(!showSettings)}
                aria-label="Toggle range customization"
              >
                <SlidersHorizontal size={15} />
                <span>{showSettings ? 'Hide Settings' : 'Customize Range'}</span>
              </button>
            </div>

            {showSettings && (
              <div className="settings-panel">
                <div className="inputs-row">
                  <div className="input-group">
                    <label htmlFor="min-input">Min Value</label>
                    <input
                      id="min-input"
                      type="number"
                      value={min}
                      onChange={(e) => setMin(e.target.value)}
                      placeholder="1"
                    />
                  </div>
                  <div className="input-divider">to</div>
                  <div className="input-group">
                    <label htmlFor="max-input">Max Value</label>
                    <input
                      id="max-input"
                      type="number"
                      value={max}
                      onChange={(e) => setMax(e.target.value)}
                      placeholder="100"
                    />
                  </div>
                </div>

                {/* Quick Preset Buttons */}
                <div className="presets-row">
                  <span className="presets-label">Presets:</span>
                  <button type="button" className="preset-pill" onClick={() => applyPreset(1, 10)}>1 - 10</button>
                  <button type="button" className="preset-pill" onClick={() => applyPreset(1, 50)}>1 - 50</button>
                  <button type="button" className="preset-pill" onClick={() => applyPreset(1, 100)}>1 - 100</button>
                  <button type="button" className="preset-pill" onClick={() => applyPreset(1, 1000)}>1 - 1,000</button>
                  <button type="button" className="preset-pill" onClick={() => applyPreset(1, 6)}>🎲 1 - 6</button>
                </div>

                {errorMessage && (
                  <div className="error-alert">
                    ⚠️ {errorMessage}
                  </div>
                )}
              </div>
            )}
          </section>

          {/* Dynamic Display Area (Conditional Rendering) */}
          <section className="display-section" aria-live="polite">
            {randomNumber === null ? (
              /* State 1: Placeholder before first generation */
              <div className="placeholder-box">
                <div className="placeholder-icon-wrap">
                  <Dices size={42} className="placeholder-icon" />
                </div>
                <h2 className="placeholder-title">No number generated yet</h2>
                <p className="placeholder-hint">
                  Click the <strong>"Generate Random Number"</strong> button below to pick a number between {min} and {max}.
                </p>
              </div>
            ) : (
              /* State 2: Dynamic number rendered after click */
              <div className={`result-box ${isAnimating ? 'animate-pop' : ''}`}>
                <div className="result-meta-top">
                  <span className="result-tag">
                    <Hash size={13} />
                    Range: {min} – {max}
                  </span>
                  <span className={`parity-pill ${randomNumber % 2 === 0 ? 'even' : 'odd'}`}>
                    {randomNumber % 2 === 0 ? 'Even Number' : 'Odd Number'}
                  </span>
                </div>

                <div className="number-display">
                  <span className="number-value">{randomNumber}</span>
                </div>

                <div className="result-actions">
                  <button 
                    className={`copy-btn ${copied ? 'copied' : ''}`}
                    onClick={handleCopy}
                    title="Copy number to clipboard"
                  >
                    {copied ? (
                      <>
                        <Check size={16} />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={16} />
                        <span>Copy Number</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </section>

          {/* Action Buttons styled with the image's mathematical color palette */}
          <section className="buttons-section">
            <button 
              className={`generate-btn ${isAnimating ? 'btn-pressed' : ''}`}
              onClick={handleGenerate}
            >
              <Dices size={22} className="btn-icon" />
              <span>Generate Random Number</span>
            </button>

            {randomNumber !== null && (
              <button 
                className="reset-btn"
                onClick={handleReset}
                title="Reset state to initial placeholder"
              >
                <RotateCcw size={18} />
                <span>Reset</span>
              </button>
            )}
          </section>

          <footer className="keyboard-hint">
            <span>Tip: Press <kbd>Space</kbd> or <kbd>Enter</kbd> to generate instantly</span>
          </footer>

          {/* Generation History */}
          {history.length > 0 && (
            <section className="history-section">
              <div className="history-header">
                <div className="history-title">
                  <History size={16} />
                  <span>Recent Rolls ({history.length})</span>
                </div>
                <button 
                  className="clear-history-btn" 
                  onClick={handleClearHistory}
                  title="Clear roll history"
                >
                  <Trash2 size={14} />
                  <span>Clear</span>
                </button>
              </div>

              <div className="history-chips">
                {history.map((item, index) => (
                  <div 
                    key={item.id} 
                    className={`history-chip ${index === 0 ? 'latest' : ''}`}
                    title={`Generated at ${item.time}`}
                  >
                    <span className="chip-value">{item.value}</span>
                    {index === 0 && <span className="chip-badge">Latest</span>}
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>

      <footer className="footer-credits">
        <p>Built with React &amp; Poppins Font • State &amp; Conditional Rendering</p>
      </footer>
    </div>
  );
}
