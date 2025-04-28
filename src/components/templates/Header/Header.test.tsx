// src/components/templates/Header/Header.test.tsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../../stores/store'; 
import Header from './Header';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

describe('Header Component', () => {
  test('renders the header with logo and navigation links', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Header title="Safety App" />
        </Provider>
      </MemoryRouter>
    );

    // Check if the logo is in the document
    expect(screen.getByAltText('Safety App logo')).toBeInTheDocument();

    // Check if navigation links are present
    expect(screen.getByTestId('home-link')).toBeInTheDocument();
    expect(screen.getByTestId('city-link')).toBeInTheDocument();
    expect(screen.getByTestId('recommend-link')).toBeInTheDocument();
    expect(screen.getByTestId('about-link')).toBeInTheDocument();
  });

  test('toggles header expansion state when navbar toggler is clicked', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Header title="Safety App" />
        </Provider>
      </MemoryRouter>
    );

    // Find the toggle button
    const toggleButton = screen.getByTestId('navbar-toggle');

    // Click the toggle button
    fireEvent.click(toggleButton);

    // Verify that the header expansion state has changed
    const state = store.getState();
    expect(state.appUi.isHeaderExpanded).toBe(true);

    // Click the toggle button again
    fireEvent.click(toggleButton);

    // Verify that the header expansion state has toggled back
    const newState = store.getState();
    expect(newState.appUi.isHeaderExpanded).toBe(false);
  });
});
