import React, { Component, type ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  override componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('Error:', error);
    console.error('Component Stack:', info.componentStack);

    if (import.meta.env.DEV && typeof React.captureOwnerStack === 'function') {
      console.error('Owner Stack:', React.captureOwnerStack());
    }
  }

  override render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}
