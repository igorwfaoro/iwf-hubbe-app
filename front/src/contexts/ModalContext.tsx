import { createContext, useContext, useEffect, useState } from 'react';
import Modal from '../components/Modal/Modal';

export type ModalRefPropType = {
    modalRef: ModalRef;
};

export interface ModalOptions<P> {
    component: React.FC<any>;
    props?: Omit<P, 'modalRef'>;
    className?: string;
    title?: string;
    onClose?: (result?: any) => void;
    hideCloseButton?: boolean;
    disableCloseOnClickOut?: boolean;
}

export interface ModalRef {
    id: string;
    component: React.FC<any>;
    props?: any;
    className?: string;
    title?: string;
    close: (result?: any) => void;
    hideCloseButton?: boolean;
    disableCloseOnClickOut?: boolean;
}

export interface IModalProvider {
    open: <P>(options: ModalOptions<P>) => ModalRef;
}

interface ModalProviderProps {
    children: JSX.Element;
}

const ModalContext = createContext<IModalProvider | undefined>(undefined);

const ModalProvider = (props: ModalProviderProps) => {
    const [modalList, setModalList] = useState<ModalRef[]>([]);

    const close = (id: string) => {
        setModalList((curr) => curr.filter((modal) => modal.id !== id));
    };

    const open = (options: ModalOptions<any>) => {
        const id = crypto.randomUUID();
        const modal: ModalRef = {
            id,
            component: options.component,
            props: options.props,
            className: options.className,
            title: options.title,
            close: (result?: any) => {
                close(id);
                if (options.onClose) options.onClose(result);
            },
            hideCloseButton: options.hideCloseButton,
            disableCloseOnClickOut: options.disableCloseOnClickOut
        };

        setModalList((ml) => [...ml, modal]);
        return modal;
    };

    return (
        <ModalContext.Provider value={{ open }}>
            {props.children}
            {modalList.map((modal) => (
                <Modal
                    key={modal.id}
                    className={modal.className}
                    close={modal.close}
                    title={modal.title}
                    hideCloseButton={modal.hideCloseButton}
                    disableCloseOnClickOut={modal.disableCloseOnClickOut}
                >
                    <modal.component {...modal.props} modalRef={modal} />
                </Modal>
            ))}
        </ModalContext.Provider>
    );
};

export default ModalProvider;

export const useModal = () => useContext(ModalContext)!;
