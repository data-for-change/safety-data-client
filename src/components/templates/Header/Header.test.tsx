import React from 'react';
import { describe, beforeEach, test, expect, vi } from 'vitest'; 
import { render, screen, fireEvent } from '@testing-library/react';
import { StoreContext } from '../../../stores/storeConfig';
import Header from './Header';
import RootStore from '../../../stores/RootStore';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom'; 

describe('Header Component', () => {
   let mockStore: RootStore;

   beforeEach(() => {
      mockStore = new RootStore();
      mockStore.uiStore.isHeaderExpanded = false;
      mockStore.uiStore.toggleHeaderExpanded = vi.fn();
   });

   test('renders the header with logo and navigation links', () => {
      render(
         <MemoryRouter>
            <StoreContext.Provider value={mockStore}>
               <Header title="Safety App" />
            </StoreContext.Provider>
         </MemoryRouter>
      );

      expect(screen.getByAltText('Safety App logo')).toBeInTheDocument();
      expect(screen.getByTestId('home-link')).toBeInTheDocument();
      expect(screen.getByTestId('city-link')).toBeInTheDocument();
      expect(screen.getByTestId('recommend-link')).toBeInTheDocument();
      expect(screen.getByTestId('about-link')).toBeInTheDocument();
   });

//    test('calls toggleHeaderExpanded when navbar toggler is clicked', () => {
//       render(
//          <MemoryRouter>
//             <StoreContext.Provider value={mockStore}>
//                <Header title="Safety App" />
//             </StoreContext.Provider>
//          </MemoryRouter>
//       );

//       // ✅ Use test ID for specific button selection
//       const toggleButton = screen.getByTestId('navbar-toggle');
//       fireEvent.click(toggleButton);

//       expect(mockStore.uiStore.toggleHeaderExpanded).toHaveBeenCalled();
//    });
});
