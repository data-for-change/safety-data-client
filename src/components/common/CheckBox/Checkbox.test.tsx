import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Checkbox from './Checkbox';
import { vi } from 'vitest';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../../i18n';
import '@testing-library/jest-dom';

describe('Checkbox component', () => {
  const mockOnChange = vi.fn();

  it('renders with label and handles change', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <Checkbox
          label="test.label"
          group="test"
          id={1}
          checked={true}
          onChange={mockOnChange}
        />
      </I18nextProvider>
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toBeChecked();

    fireEvent.click(checkbox);
    expect(mockOnChange).toHaveBeenCalled();
  });
});
