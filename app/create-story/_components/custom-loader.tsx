import {
    Modal,
    ModalContent,
    ModalBody,
    useDisclosure,
} from '@nextui-org/modal';
import Image from 'next/image';
import { useEffect } from 'react';

const CustomLoader = ({ loading }: { loading: boolean }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    useEffect(() => {
        onOpen();
    }, [onOpen]);
    return (
        <div>
            {loading && (
                <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                    <ModalContent>
                        {() => (
                            <>
                                <ModalBody className="p-10 flex items-center justify-center">
                                    <Image
                                        src="/loader.gif"
                                        alt="loader-gif"
                                        width={100}
                                        height={100}
                                        className="w-[200px] h-[200px]"
                                    />
                                    <h2 className="font-semibold text-primary text-lg text-center">
                                        Please wait your story is getting
                                        generated
                                    </h2>
                                </ModalBody>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            )}
        </div>
    );
};

export default CustomLoader;
