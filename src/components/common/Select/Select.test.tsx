import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import Select from './Select';
import { KeyVal } from '../../../types';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../../i18n';
import '@testing-library/jest-dom';

describe('Select component', () => {
  const mockData: KeyVal[] = [
    { val: '1', text: 'Option 1' },
    { val: '2', text: 'Option 2' },
  ];

  it('renders with label and options', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <Select
          label="Test Label"
          id="test-select"
          data={mockData}
          value="1"
          onChange={() => {}}
        />
      </I18nextProvider>
    );
    // Check that the label is rendered
    expect(screen.getByText(/Test Label/i)).toBeInTheDocument();

    // Check that options are rendered
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /Option 1/i })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /Option 2/i })).toBeInTheDocument();
  });

  it('calls onChange when a new option is selected', () => {
    const handleChange = vi.fn();

    render(
      <I18nextProvider i18n={i18n}>
        <Select
          label="Test Label"
          id="test-select"
          data={mockData}
          value="1"
          onChange={handleChange}
        />
      </I18nextProvider>
    );

    fireEvent.change(screen.getByRole('combobox'), { target: { value: '2' } });

    expect(handleChange).toHaveBeenCalledWith('2');
  });
});
