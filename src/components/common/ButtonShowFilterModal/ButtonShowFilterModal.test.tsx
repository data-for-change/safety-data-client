import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import appUiReducer, { setShowFilterModal } from '../../../stores/ui/appUiSlice';
import ButtonShowFilterModal from './ButtonShowFilterModal';

describe('ButtonShowFilterModal Component', () => {
  // Test-specific reducer that only handles what we need
  const testReducer = (state = { appUi: { showFilterModal: false } }, action: any) => {
    if (action.type === 'appUi/setShowFilterModal') {
      return {
        ...state,
        appUi: {
          ...state.appUi,
          showFilterModal: action.payload
        }
      };
    }
    return state;
  };

  it('should render correctly and dispatch action when clicked', () => {
    // Create a simple store with our test reducer
    const mockStore = createStore(testReducer);
    
    // Spy on the dispatch function
    const dispatchSpy = vi.spyOn(mockStore, 'dispatch');
    
    render(
      <Provider store={mockStore}>
        <ButtonShowFilterModal />
      </Provider>
    );
    
    // Find the button and click it
    const filterButton = screen.getByTestId('filter-button');
    
    // Click the button
    fireEvent.click(filterButton);
    
    // Verify the action was dispatched
    expect(dispatchSpy).toHaveBeenCalled();
    expect(mockStore.getState().appUi.showFilterModal).toBe(true);
  });
});