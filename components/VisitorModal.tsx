import { VisitorResponse } from "@/module/model/api";
import { useAppContext } from "@/src/context/AppContext";
import { setLocalVisitor } from "@/src/localStorage";
import { ModalProps } from "@/src/props";
import { Button, FormLabel, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

export const VisitorModal = ({ isOpen, onOpen, onClose }: ModalProps) => {
    // digunakan untuk menampilkan visitor modal
    // const visitorId = localStorage.getItem(localID);
    const state = useAppContext()
    const router = useRouter()

    const [visitorData, setVisitorData] = useState({
        fullname: "",
        address: "",
    })

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const processVisitor = async(fullname: string, address: string) => {
        setLoading(true);
        
        if(!fullname || !address) {
            setError("Mohon isi semua data terlebih dahulu");
            return;
        }
        
        try {
            const response = await axios<VisitorResponse>({ method: "POST", url: `/api/v1/visitors`, data: {fullname, address} });

            if (response.status === 201) {
                setLocalVisitor({
                    id: response.data.id,
                    fullname: response.data.fullname,
                    address: response.data.address
                });
                state.setVisitorStatus(true);
                onClose();
            }

            console.log("resp status:", response.status)
            console.log("resp data:", response.data)
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Modal
            isCentered
            motionPreset="slideInBottom" 
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalOverlay
                backdropBlur="md"
            />
            <ModalContent>
                <ModalHeader>Sepertinya kamu pendatang baru, mohon isi data diri terlebih dahulu sebelum melanjutnya</ModalHeader>

                <ModalBody>
                    <FormLabel>Nama Lengkap</FormLabel>
                    <Input 
                        placeholder="eg. Pratama Jaya"
                        value={visitorData.fullname}
                        onChange={e => setVisitorData({...visitorData, fullname: e.target.value})}    
                    />
                    <FormLabel>Alamat</FormLabel>
                    <Input 
                        placeholder="..." 
                        value={visitorData.address} 
                        onChange={e => setVisitorData({...visitorData, address: e.target.value})} 
                    />
                </ModalBody>
                <ModalFooter>
                    <Button
                        onClick={() => router.back()}
                    >
                        Kembali
                    </Button>
                    <Button
                        onClick={() => processVisitor(visitorData.fullname, visitorData.address)}
                    >
                        Simpan
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}