import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import TextFieldSizes from './TextField';

describe('TextFieldSizes Component', () => {

  it('renders the TextField component with initial value "None"', () => {
    render(<TextFieldSizes onTextChange={jest.fn()} />);

    const textField = screen.getByRole('textbox');
    expect(textField).toHaveValue('None');
  });

  it('calls onTextChange when the user types in the TextField', () => {
    const mockOnTextChange = jest.fn();
    render(<TextFieldSizes onTextChange={mockOnTextChange} />);

    const textField = screen.getByRole('textbox');

    fireEvent.change(textField, { target: { value: 'New Value' } });

    expect(mockOnTextChange).toHaveBeenCalledWith('New Value');
  });

  it('updates the TextField value when the user types', () => {
    render(<TextFieldSizes onTextChange={jest.fn()} />);

    const textField = screen.getByRole('textbox');

    fireEvent.change(textField, { target: { value: 'Updated Value' } });

    expect(textField).toHaveValue('Updated Value');
  });

});