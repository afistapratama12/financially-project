import { Button, Modal, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react"
import { useRouter } from "next/router"

// error when data not found in context state or local storage
export default function ErrorModalResult() {
    const router = useRouter()

    return (
        <Modal
            isCentered
            isOpen={true}
            onClose={() => router.push("/")}
            motionPreset="slideInBottom"
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Kamu tidak dapat membuka halaman ini sebelum mengisi data yang diperlukan</ModalHeader>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={() => router.push("/")}>
                        Kembali
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}