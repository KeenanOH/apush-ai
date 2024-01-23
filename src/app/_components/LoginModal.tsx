import { signIn } from "next-auth/react"
import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay
} from "@chakra-ui/modal"

import ContinueWithGoogleButton from "@/app/_components/ContinueWithGoogleButton"

export default function LoginModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {

    return (
        <Modal isOpen={ isOpen } onClose={ onClose }>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Log in</ModalHeader>
                <ModalCloseButton />
                <ModalBody>To use APUSH AI, please continue in with google</ModalBody>
                <ModalFooter>
                    <ContinueWithGoogleButton onClick={ () => signIn("google", { callbackUrl: "/dashboard" }) } />
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
