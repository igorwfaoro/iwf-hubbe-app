import { render } from '@testing-library/react';
import ProviderComposer from './ProviderComposer';

describe('ProviderComposer Component', () => {
    it('should render the ProviderComposer component with children', () => {
        const { getByText } = render(
            <ProviderComposer components={[]}>
                <p>This is some content.</p>
            </ProviderComposer>
        );
        const content = getByText('This is some content.');
        expect(content).toBeInTheDocument();
    });

    it('should render the ProviderComposer component with multiple components', () => {
        const { getByText } = render(
            <ProviderComposer
                components={[
                    {
                        Component: ({ children }) => <div className="provider-a">{children}</div>,
                    },
                    {
                        Component: ({ children }) => <div className="provider-b">{children}</div>,
                    },
                ]}
            >
                <p>Wrapped Content</p>
            </ProviderComposer>
        );

        const providerA = getByText('Wrapped Content').closest('.provider-a');
        const providerB = getByText('Wrapped Content').closest('.provider-b');

        expect(providerA).toBeInTheDocument();
        expect(providerB).toBeInTheDocument();
    });

    it('should pass props to components', () => {
        const { getByTestId } = render(
            <ProviderComposer
                components={[
                    {
                        Component: ({ children, testId }) => (
                            <div data-testid={testId}>{children}</div>
                        ),
                        props: { testId: 'provider-a' },
                    },
                ]}
            >
                <p>Content with Props</p>
            </ProviderComposer>
        );

        const providerA = getByTestId('provider-a');

        expect(providerA).toBeInTheDocument();
    });
});
