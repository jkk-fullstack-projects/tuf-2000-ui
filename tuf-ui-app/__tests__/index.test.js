import { render, screen } from '@testing-library/react';
import Home from '../src/app/page.js';

describe('Index', () => {
    it('renders correctly', () => {
        render(<Home />);
        expect(screen.getByText('Hello World')).toBeInTheDocument();
    });
});
