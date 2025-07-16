import { render, fireEvent, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import AppContentSwitcher from '../../../../components/app-content-switcher/AppContentSwitcher'

const switchOptions = {
  left: { text: 'Left Option', tooltip: 'Left Tooltip' },
  right: { text: 'Right Option', tooltip: 'Right Tooltip' }
}

describe('AppContentSwitcher', () => {
  it('should render with the correct props', () => {
    render(
      <AppContentSwitcher
        active
        onChange={() => {}}
        switchOptions={switchOptions}
        typographyVariant='body1'
      />
    )

    expect(screen.getByText('Left Option')).toBeInTheDocument()
    expect(screen.getByText('Right Option')).toBeInTheDocument()

    const switchElement = screen.getByTestId('switch')
    const input = switchElement.querySelector('input[type="checkbox"]')
    expect(input.checked).toBe(true)
  })

  it('should call the onChange function when the switch is clicked', () => {
    const onChangeMock = vi.fn()
    render(
      <AppContentSwitcher
        active={false}
        onChange={onChangeMock}
        switchOptions={switchOptions}
        typographyVariant='body1'
      />
    )

    const switchElement = screen.getByTestId('switch')
    const input = switchElement.querySelector('input[type="checkbox"]')
    fireEvent.click(input)
    expect(onChangeMock).toHaveBeenCalledTimes(1)
  })

  it('should render tooltips when tooltip props are passed', async () => {
    render(
      <AppContentSwitcher
        active
        onChange={() => {}}
        switchOptions={switchOptions}
        typographyVariant='body1'
      />
    )

    const leftText = screen.getByText('Left Option')
    fireEvent.mouseOver(leftText)
    expect(await screen.findByText('Left Tooltip')).toBeInTheDocument()

    const rightText = screen.getByText('Right Option')
    fireEvent.mouseOver(rightText)
    expect(await screen.findByText('Right Tooltip')).toBeInTheDocument()
  })
})
