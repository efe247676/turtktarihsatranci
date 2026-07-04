import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Uygulama çökerse ekranın kararması yerine hata mesajı gösterir.
 * Böylece "kara ekran" yerine ne olduğunu görürüz.
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Uygulama hatası:', error, info);
  }

  handleReload = () => {
    // Service worker cache'ini temizleyip yeniden yükle
    if ('caches' in window) {
      caches.keys().then((names) => names.forEach((n) => caches.delete(n)));
    }
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
            background: 'linear-gradient(135deg, #1c1917, #44403c, #064e3b)',
            color: '#f8f4e3',
            fontFamily: 'system-ui, sans-serif',
            textAlign: 'center',
          }}
        >
          <div style={{ maxWidth: 420 }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>♛ ⚔</div>
            <h1 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#fbbf24' }}>
              Bir sorun oluştu
            </h1>
            <p style={{ fontSize: '0.9rem', opacity: 0.8, marginBottom: '1.5rem' }}>
              Türk Tarihi Satrancı yüklenirken beklenmedik bir hata oluştu.
            </p>
            <button
              onClick={this.handleReload}
              style={{
                padding: '0.75rem 2rem',
                fontSize: '1rem',
                fontWeight: 'bold',
                color: '#1c1917',
                background: 'linear-gradient(135deg, #fbbf24, #d97706)',
                border: 'none',
                borderRadius: '0.75rem',
                cursor: 'pointer',
              }}
            >
              🔄 Yeniden Dene
            </button>
            {this.state.error && (
              <pre
                style={{
                  marginTop: '1.5rem',
                  padding: '0.75rem',
                  fontSize: '0.7rem',
                  textAlign: 'left',
                  background: 'rgba(0,0,0,0.4)',
                  borderRadius: '0.5rem',
                  overflow: 'auto',
                  maxHeight: 150,
                  opacity: 0.7,
                }}
              >
                {this.state.error.message}
              </pre>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
