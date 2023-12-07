interface ProviderComposerProps {
    components: {
        Component: React.JSXElementConstructor<React.PropsWithChildren<any>>;
        props?: { [key: string]: any };
    }[];
    children: React.ReactNode;
}

export default function ProviderComposer(props: ProviderComposerProps) {
    return (
        <>
            {props.components.reduceRight(
                (acc, Comp) => (
                    <Comp.Component {...Comp.props}>{acc}</Comp.Component>
                ),
                props.children
            )}
        </>
    );
}
