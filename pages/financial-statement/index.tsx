import { VisitorModal } from "@/components/modal/VisitorModal"
import { useAppContext } from "@/src/context/AppContext"
import { FinancialStatementBusinessTypeEnum, FinancialStatementTypeEnum } from "@/src/props"
import { featureType, financialStatementBusinessType, financialStatementType } from "@/src/props/const"
import { Button, Flex, Heading, Text, useDisclosure } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useState } from "react"

function FinancialStatementPersonal() {
    return (
        <div>
            <Heading>Ini form untuk pribadi</Heading>
        </div>
    )
}

function FinancialStatementBusiness() {
    const state = useAppContext()
    
    const changeBusinessName = (e: React.ChangeEvent<HTMLInputElement>) => {
        state.setType({
            ...state.value.type,
            financialStatementBusinessName: e.target.value
        })
    }

    return (
        <div>
            <Heading>Ini form untuk bisnis</Heading>

            <div>
                <Text>Isi nama bisnis kamu</Text>
                <input 
                    type="text" 
                    value={state.value.type.FinancialStatementBusinessName || ""}
                    onChange={changeBusinessName}
                />
            </div>
        </div>
    )
}

export default function financialStatement() {
    const router = useRouter()
    const state = useAppContext()
    
    const { isOpen, onOpen, onClose} = useDisclosure()

    const [isBusiness, setIsBusiness] = useState<boolean | undefined>()
    const [isBusinessTypeSelected, setIsBusinessTypeSelected] = useState<boolean>(false)

    const setFinancialStatementType = (type: FinancialStatementTypeEnum, businessType?: FinancialStatementBusinessTypeEnum) => {
        state.setType({
            ...state.value.type,
            type: featureType.FINANCIAL_STATEMENT,
            financialStatementType: type,
            financialStatementBusinessType: businessType
        })

        setIsBusiness(type === financialStatementType.BUSINESS)
        setIsBusinessTypeSelected(businessType !== undefined)
    }
    
    return (
        <>
            <VisitorModal 
                isOpen={isOpen}
                onClose={onClose}
                onOpen={onOpen}
            />

            <div>
                <div>
                    <Button
                        onClick={() => router.back()}
                    >Kembali</Button>
                </div>

                <Heading>
                    Form Pengisian Laporan Keuangan
                </Heading>
                <Text>Laporang keuangan ini akan dihitung dalam setahun, mohon siapkan data yang dibutuhkan</Text>
            
                <div>
                    <Text>Pilih Jenis laporan keuangan yang akan dibuat</Text>

                    <Flex>
                        <Button 
                            onClick={() => setFinancialStatementType(financialStatementType.PERSONAL)}
                        >Pribadi
                        </Button>
                        <Button
                            onClick={() => setFinancialStatementType(financialStatementType.BUSINESS)}
                        >Bisnis
                        </Button>
                    </Flex>
                </div>

                {   isBusiness && (
                        <div>
                            <Text>Pilih Jenis Bisnis kamu</Text>

                            <Flex>
                                <Button
                                    onClick={() => setFinancialStatementType(
                                        financialStatementType.BUSINESS, 
                                        financialStatementBusinessType.SERVICE
                                    )}
                                >Jasa
                                </Button>

                                <Button
                                    onClick={() => setFinancialStatementType(
                                        financialStatementType.BUSINESS,
                                        financialStatementBusinessType.TRADE
                                    )}
                                >Dagang/Jual beli
                                </Button>

                                <Button
                                    onClick={() => setFinancialStatementType(
                                        financialStatementType.BUSINESS, 
                                        financialStatementBusinessType.MANUFACTURE
                                    )}
                                >Produksi/Manufaktur
                                </Button>
                            </Flex>
                        </div>
                    )
                }

                { isBusiness && isBusinessTypeSelected && <FinancialStatementBusiness /> }
                { isBusiness === false && <FinancialStatementPersonal /> }
            </div>
        </>
    )
}