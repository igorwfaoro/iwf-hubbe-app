import { render } from '@testing-library/react';
import Skeleton from './Skeleton';

describe('Skeleton Component', () => {
    it('should render the Skeleton component with default styles', () => {
        const { container } = render(<Skeleton />);
        const skeletonElement = container.firstChild;
        expect(skeletonElement).toHaveClass(
            'animate-pulse bg-gray-200 dark:bg-gray-300'
        );
    });

    it('should render the Skeleton component with custom className', () => {
        const { container } = render(<Skeleton className="custom-class" />);
        const skeletonElement = container.firstChild;
        expect(skeletonElement).toHaveClass('custom-class');
    });
});
