import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, vi } from 'vitest'
import EnhancedTableRow from '~/components/enhanced-table/enhanced-table-row/EnhancedTableRow'

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn()
}))

const columns = [
  { field: 'name', label: 'Name' },
  { field: 'age', label: 'Age' },
  {
    label: 'Nick Name',
    calculatedCellValue: (item) => {
      return item.name + item.age
    }
  }
]
const item = { _id: 1, name: 'Joe', age: 25 }

describe('EnhancedTableRow component', () => {
  it('renders table cells based on columns', () => {
    render(<EnhancedTableRow columns={columns} item={item} />)
    expect(screen.getByText('Joe')).toBeInTheDocument()
    expect(screen.getByText('25')).toBeInTheDocument()
    expect(screen.getByText('Joe25')).toBeInTheDocument()
  })

  it('call handleSelectCall when checkbox is clicked', async () => {
    const select = {
      isSelected: vi.fn().mockReturnValue(true),
      handleSelectClick: vi.fn()
    }
    const { getByRole } = render(
      <EnhancedTableRow
        columns={columns}
        isSelection
        item={item}
        select={select}
      />
    )
    const checkbox = getByRole('checkbox')
    await userEvent.click(checkbox)
    expect(select.handleSelectClick).toHaveBeenCalledWith(
      expect.anything(),
      item._id
    )
  })

  it('renders action menu when menu icon is clicked', async () => {
    const rowActions = [
      { label: 'Edit', func: vi.fn() },
      { label: 'Delete', func: vi.fn() }
    ]

    const { getByTestId, findByText } = render(
      <EnhancedTableRow columns={columns} item={item} rowActions={rowActions} />
    )

    const menuButton = getByTestId('menu-icon')
    await userEvent.click(menuButton)

    for (const action of rowActions) {
      expect(await findByText(action.label)).toBeInTheDocument()
    }
  })

  it('calls onAction when menu item is clicked', async () => {
    const rowActions = [
      { label: 'Edit', func: vi.fn() },
      { label: 'Delete', func: vi.fn() }
    ]

    render(
      <EnhancedTableRow columns={columns} item={item} rowActions={rowActions} />
    )

    const menuButton = screen.getByTestId('menu-icon')
    await userEvent.click(menuButton)

    const editButton = screen.getByText('Edit')
    await userEvent.click(editButton)

    expect(rowActions[0].func).toHaveBeenCalledWith(item._id)
  })

  it('closes the menu when escape key is pressed', async () => {
    const rowActions = [
      { label: 'Edit', func: vi.fn() },
      { label: 'Delete', func: vi.fn() }
    ]

    render(
      <EnhancedTableRow columns={columns} item={item} rowActions={rowActions} />
    )

    const menuButton = screen.getByTestId('menu-icon')
    await userEvent.click(menuButton)

    const menu = screen.getByRole('menu')
    expect(menu).toBeVisible()

    await userEvent.keyboard('{Escape}')
    expect(menu).not.toBeVisible()
  })
})
