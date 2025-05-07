import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import MySelect from './MySelect';
import '@testing-library/jest-dom';

describe('MySelect', () => {
  const options = [
    { id: '1', name: 'Apple' },
    { id: '2', name: 'Banana' },
  ];

  it('renders options and label', () => {
    render(
      <MySelect
        data={options}
        valProp="id"
        contentProp="name"
        label="Select Fruit"
        id="fruit-select"
        onChange={() => {}}
      />
    );

    // label is rendered
    expect(screen.getByLabelText('Select Fruit')).toBeInTheDocument();

    // options are rendered
    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.getByText('Banana')).toBeInTheDocument();
  });

  it('calls onChange when selection changes', () => {
    const handleChange = vi.fn();

    render(
      <MySelect
        data={options}
        valProp="id"
        contentProp="name"
        label="Fruit"
        onChange={handleChange}
        value="1"
      />
    );

    const select = screen.getByLabelText('Fruit');
    fireEvent.change(select, { target: { value: '2' } });

    expect(handleChange).toHaveBeenCalled();
  });
});
