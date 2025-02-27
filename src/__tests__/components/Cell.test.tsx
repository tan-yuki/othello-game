import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import 'jest-styled-components';
import Cell from '../../components/Cell';

describe('Cell Component', () => {
  it('renders empty cell correctly', () => {
    const mockOnClick = jest.fn();
    const { container } = render(
      <Cell value={null} onClick={mockOnClick} isValidMove={false} data-testid="test-cell" />
    );
    
    const cellElement = container.firstChild;
    
    // スタイルのテスト
    expect(cellElement).toHaveStyleRule('background-color', '#43a047');
    expect(cellElement).toHaveStyleRule('cursor', 'default');
    
    // 有効な手のインジケーターが表示されていないことを確認
    expect(container.querySelector('div > div')).toBeNull();
  });
  
  it('renders cell with valid move indicator', () => {
    const mockOnClick = jest.fn();
    const { container } = render(
      <Cell value={null} onClick={mockOnClick} isValidMove={true} data-testid="test-cell" />
    );
    
    const cellElement = container.firstChild;
    
    // スタイルのテスト
    expect(cellElement).toHaveStyleRule('cursor', 'pointer');
    expect(cellElement).toHaveStyleRule('background-color', '#66bb6a', {
      modifier: ':hover'
    });
    
    // 有効な手のインジケーターが表示されていることを確認
    const indicator = container.querySelector('div > div');
    expect(indicator).not.toBeNull();
    expect(indicator).toHaveStyleRule('background-color', 'rgba(0, 0, 0, 0.2)');
  });
  
  it('renders cell with disc', () => {
    const mockOnClick = jest.fn();
    const { container } = render(
      <Cell value="black" onClick={mockOnClick} isValidMove={false} data-testid="test-cell" />
    );
    
    // Discコンポーネントが表示されていることを確認
    const discElement = container.querySelector('div > div');
    expect(discElement).not.toBeNull();
  });
  
  it('calls onClick when clicked', () => {
    const mockOnClick = jest.fn();
    const { container } = render(
      <Cell value={null} onClick={mockOnClick} isValidMove={true} data-testid="test-cell" />
    );
    
    const cellElement = container.firstChild;
    fireEvent.click(cellElement as Element);
    
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});