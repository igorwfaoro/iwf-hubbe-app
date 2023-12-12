import { render } from '@testing-library/react';
import Page from './Page';

describe('Page Component', () => {
    it('should render the Page component with children', () => {
        const { getByText } = render(
            <Page>
                <p>This is some content.</p>
            </Page>
        );
        const content = getByText('This is some content.');
        expect(content).toBeInTheDocument();
    });

    it('should apply custom classNames to the Page component', () => {
        const { container } = render(
            <Page wrapperClassName="custom-wrapper-class" className="custom-page-class">
                <p>Custom Page</p>
            </Page>
        );

        expect(container.firstChild).toHaveClass('custom-wrapper-class');
        expect(container.firstChild?.firstChild).toHaveClass('custom-page-class');
    });

    it('should render a Page Title', () => {
        const { getByText } = render(<Page.Title>Title Text</Page.Title>);
        const title = getByText('Title Text');
        expect(title).toBeInTheDocument();
    });

    it('should apply custom classNames to the Page Title', () => {
        const { container } = render(
            <Page.Title className="custom-title-class">Custom Title</Page.Title>
        );
        expect(container.querySelector('.custom-title-class')).toBeInTheDocument();
    });

    it('should render a Page Subtitle', () => {
        const { getByText } = render(<Page.Subtitle>Subtitle Text</Page.Subtitle>);
        const subtitle = getByText('Subtitle Text');
        expect(subtitle).toBeInTheDocument();
    });

    it('should apply custom classNames to the Page Subtitle', () => {
        const { container } = render(
            <Page.Subtitle className="custom-subtitle-class">Custom Subtitle</Page.Subtitle>
        );

        expect(container.firstChild).toHaveClass('custom-subtitle-class');
    });
});
