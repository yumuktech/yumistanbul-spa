import React, { Component, ReactNode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';

class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean; error: Error | null }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }
  componentDidCatch(error: Error, info: unknown) {
    // Log to console (could integrate with monitoring later)
    console.error('[ErrorBoundary]', error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '40px', maxWidth: '640px', margin: '0 auto', fontFamily: 'system-ui' }}>
          <h1 style={{ fontSize: '24px', marginBottom: '16px' }}>Bir şeyler yanlış gitti</h1>
          <p style={{ color: '#555', marginBottom: '24px' }}>
            Sayfa yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.
          </p>
          {this.state.error && (
            <pre style={{ background: '#f7f7f7', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '12px' }}>
              {this.state.error.message}
            </pre>
          )}
          <button onClick={() => window.location.reload()} style={{ padding: '8px 16px', cursor: 'pointer' }}>Yenile</button>
        </div>
      );
    }
    return this.props.children;
  }
}
import './styles/base.css';
import './styles/simple.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
);
