import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ButtonToggle from './ButtonToggle'
import React from 'react'

// mock useTranslation so you don't need i18n setup
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key, // just return the key for testing
  }),
}))

describe('ButtonToggle', () => {
  it('shows textTrue when condition is true', () => {
    render(
      <ButtonToggle
        condtion={true}
        textTrue="Yes"
        textFalse="No"
        onClick={() => {}}
      />
    )
    expect(screen.getByText('Yes')).toBeInTheDocument()
  })

  it('shows textFalse when condition is false', () => {
    render(
      <ButtonToggle
        condtion={false}
        textTrue="Yes"
        textFalse="No"
        onClick={() => {}}
      />
    )
    expect(screen.getByText('No')).toBeInTheDocument()
  })

  it('calls onClick when clicked', () => {
    const onClickMock = vi.fn()
    render(
      <ButtonToggle
        condtion={true}
        textTrue="Yes"
        textFalse="No"
        onClick={onClickMock}
      />
    )
    fireEvent.click(screen.getByRole('button'))
    expect(onClickMock).toHaveBeenCalledTimes(1)
  })

  it('is disabled when disabled prop is true', () => {
    render(
      <ButtonToggle
        condtion={true}
        textTrue="Yes"
        textFalse="No"
        disabled={true}
        onClick={() => {}}
      />
    )
    expect(screen.getByRole('button')).toBeDisabled()
  })
})
