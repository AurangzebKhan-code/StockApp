import React, { ComponentType } from 'react';
import ErrorBoundary from '../components/ErrorBoundary';


export function withErrorHandling<P extends object>(
  WrappedComponent: ComponentType<P>
): React.FC<P> {
  const WithErrorHandling: React.FC<P> = (props) => {
    return (
      <ErrorBoundary>
        <WrappedComponent {...props} />
      </ErrorBoundary>
    );
  };

  const wrappedName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
  WithErrorHandling.displayName = `withErrorHandling(${wrappedName})`;

  return WithErrorHandling;
}