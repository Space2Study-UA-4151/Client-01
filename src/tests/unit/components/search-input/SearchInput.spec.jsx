import { render, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect } from 'vitest'
import SearchInput from '~/components/search-input/SearchInput'

describe('SearchInput', () => {
  it('renders the input field', () => {
    const { getByRole } = render(<SearchInput />)
    expect(getByRole('textbox')).toBeInTheDocument()
  })

  it('calls setSearch when search icon is clicked', () => {
    const setSearch = vi.fn()
    const { getByTestId } = render(
      <SearchInput search='joe' setSearch={setSearch} />
    )
    const searchIcon = getByTestId('search-icon')
    fireEvent.click(searchIcon)
    expect(setSearch).toHaveBeenCalledWith('joe')
  })

  it('calls setSearch when delete icon is clicked', () => {
    const setSearch = vi.fn()
    const { getByTestId } = render(
      <SearchInput search='joe' setSearch={setSearch} />
    )
    const deleteIcon = getByTestId('delete-icon')
    fireEvent.click(deleteIcon)
    expect(setSearch).toHaveBeenCalledWith('')
  })

  it('calls setSearch when enter is pressed', async () => {
    const setSearch = vi.fn()
    const user = userEvent.setup()

    const { getByRole } = render(
      <SearchInput search='' setSearch={setSearch} />
    )
    const textbox = getByRole('textbox')
    await user.type(textbox, 'test{enter}')
    expect(setSearch).toHaveBeenCalledWith('test')
  })

  it('has hidden class when search is empty', () => {
    const { getByTestId } = render(<SearchInput search='' />)
    const deleteIcon = getByTestId('delete-icon')
    expect(deleteIcon).toHaveClass('hidden')
  })

  it('has hidden class when search is empty', () => {
    const { getByTestId } = render(<SearchInput search='test' />)
    const deleteIcon = getByTestId('delete-icon')
    expect(deleteIcon).toHaveClass('visible')
  })
})
