import { VisitorResponse } from "@/module/model/api";
import { localID, setLocalVisitor } from "@/src/localStorage";
import { FormLabel, Input, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

export const VisitorModal = ({ children }: any) => {
    // digunakan untuk menampilkan visitor modal
    const visitorId = localStorage.getItem(localID);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const checkVisitor = async () => {
        try {
            if (visitorId) {
                const response = await axios<VisitorResponse>({ method: "GET", url: `/api/visitors`, data: {id : visitorId} });
    
                if (response.data) {
                    // jika visitor id sudah ada di local storage
                    // maka tampilkan children
                    setLocalVisitor(response.data.id, response.data.fullname, response.data.address);
                } else {
                    // jika visitor id tidak ada di dalam database
                    // maka tampilkan visitor modal
                    onOpen();
                }
            } else {
                // jika visitor id tidak ada di local storage
                // maka tampilkan visitor modal
                onOpen();
            }
        } catch (err) {
            console.log(err);
            onOpen()
        }
    }

    const processVisitor = async(fullname: string, address: string) => {
        try {
            const response = await axios<VisitorResponse>({ method: "POST", url: `/api/visitors`, data: {fullname, address} });

            if (response.status === 201) {
                // jika visitor berhasil dibuat
                // maka tampilkan children
                setLocalVisitor(response.data.id, response.data.fullname, response.data.address);
                onClose();
            }

            setLocalVisitor(response.data.id, response.data.fullname, response.data.address);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        checkVisitor()
    }, [])

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>Mohon isi data terlebih dahulu</ModalHeader>

                <ModalBody>
                    <FormLabel>Nama Lengkap</FormLabel>
                    <Input/>

                    <FormLabel>Alamat</FormLabel>
                    <Input/>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}