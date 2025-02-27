import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import 'jest-styled-components';
import Disc from '../../components/Disc';

describe('Disc Component', () => {
  it('renders black disc correctly', () => {
    const { container } = render(<Disc color="black" />);
    const discElement = container.firstChild;
    
    // スタイルのテスト
    expect(discElement).toHaveStyleRule('background-color', '#000');
    
    // アニメーションが適用されていることを確認
    expect(discElement).toHaveStyleRule('animation', expect.stringContaining('flipAnimation'));
  });
  
  it('renders white disc correctly', () => {
    const { container } = render(<Disc color="white" />);
    const discElement = container.firstChild;
    
    // スタイルのテスト
    expect(discElement).toHaveStyleRule('background-color', '#fff');
    
    // アニメーションが適用されていることを確認
    expect(discElement).toHaveStyleRule('animation', expect.stringContaining('flipAnimation'));
  });
});