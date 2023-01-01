import { GetAddressList } from "@/module/internal/user/data";
import { VisitorResponse } from "@/module/model/api";
import { useAppContext } from "@/src/context/AppContext";
import { ModalProps } from "@/src/props";
import { apiURL, local } from "@/src/props/const";
import { Box, Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, Text } from "@chakra-ui/react";
import { AutoComplete, AutoCompleteInput, AutoCompleteItem, AutoCompleteList } from "@choc-ui/chakra-autocomplete";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

export const VisitorModal = ({ isOpen, onOpen, onClose }: ModalProps) => {
    // digunakan untuk menampilkan visitor modal
    // const visitorId = localStorage.getItem(localID);
    const state = useAppContext()
    const router = useRouter()

    const listAddress = GetAddressList()

    const [visitorData, setVisitorData] = useState({
        fullname: "",
        address: "",
    })

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const filterAddressSearch = (address: string) => {
        return address.toLowerCase().replace(/[\s,]/g, '').includes(visitorData.address.toLowerCase().replace(/[\s,]/g, ''))
    }

    const processVisitor = async(fullname: string, address: string) => {
        setLoading(true);
        
        if(!fullname || !address) {
            setError("Mohon isi semua data terlebih dahulu");
            return;
        }
        
        try {
            const response = await axios<VisitorResponse>({ 
                method: "POST", 
                url: apiURL.CREATE_VISITOR, 
                data: {
                    fullname, 
                    address
                } 
            });

            if (response.status === 201) {
                localStorage.setItem(local.VISITOR_ID, response.data.id);
                localStorage.setItem(local.VISITOR_FULLNAME, response.data.fullname);
                localStorage.setItem(local.VISITOR_ADDRESS, response.data.address);

                state.setVisitorStatus(true);
                onClose();
            }

        } catch (err) {
            //TODO: handle for error
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    console.log("visitor Data:", visitorData)

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
                    <FormControl>
                        <FormLabel>Nama Lengkap</FormLabel>
                        <Input 
                            placeholder="eg. Pratama Jaya"
                            value={visitorData.fullname}
                            onChange={e => setVisitorData({...visitorData, fullname: e.target.value})}    
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Alamat</FormLabel>
                        <AutoComplete openOnFocus
                            onChange={
                                (value) => {
                                    if(!value) {
                                        setVisitorData({...visitorData, address: ""})
                                    } else {
                                        setVisitorData({...visitorData, address: value})
                                    }
                                }
                            }
                        >
                            <AutoCompleteInput 
                                variant="filled"
                                placeholder="eg. Depok, Jawa Barat"
                            />
                            <AutoCompleteList
                                maxH="300px"
                            >
                                { listAddress.map((address, index) => (
                                    <AutoCompleteItem 
                                        key={"option-" + index} 
                                        value={address}
                                        label={address}
                                        textTransform="capitalize"
                                        onClick={() => setVisitorData({...visitorData, address})}
                                    >
                                        {address}
                                    </AutoCompleteItem>   
                                    ))
                                }
                            </AutoCompleteList>

                        </AutoComplete>
                    </FormControl>
                    
                    
                </ModalBody>
                <ModalFooter>
                    <Button
                        onClick={() => router.back()}
                    >
                        Kembali
                    </Button>
                    <Button
                        onClick={() => processVisitor(visitorData.fullname, visitorData.address)}
                        disabled={loading}
                    >
                        {loading ? <Spinner/> : "Lanjut"}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}