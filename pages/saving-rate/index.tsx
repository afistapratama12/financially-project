import FormFeature from "@/components/form/FormFeature";
import { VisitorModal } from "@/components/modal/VisitorModal";
import { FormDetails } from "@/module/internal/entity";
import { isEmpties } from "@/module/internal/helper/empty";
import { SavingRateDetail } from "@/module/internal/savingRate/entity";
import { VisitorResponse } from "@/module/model/api";
import { useAppContext } from "@/src/context/AppContext";
import { generateSlug, getSerial } from "@/src/helper/helper";
import { apiURL, featureType, local, path, savingRateRange } from "@/src/props/const";
import { SavingRateRangeEnum } from "@/src/props";
import { Button, Flex, Text, useDisclosure, Heading } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function savingRate() {
    const state = useAppContext()
    const router = useRouter()

    const [isDataEmpty, setIsDataEmpty] = useState<boolean>(false)

    const [otherIncomeDetail, setOtherIncomeDetail] = useState<SavingRateDetail[]>([{ name: "", amount: 0}])
    const [investmentDetail, setInvestmentDetail] = useState<SavingRateDetail[]>([{ name: "", amount: 0 }])
    const [installmentDetail, setInstallmentDetail] = useState<SavingRateDetail[]>([{ name: "", amount: 0 }])
    const [expensesDetail, setExpensesDetail] = useState<SavingRateDetail[]>([{ name: "", amount: 0 }])

    const { isOpen, onOpen, onClose } = useDisclosure({
        defaultIsOpen: false
    })

    useEffect(() => {
        state.setType({
            ...state.value.type,
            type: featureType.SAVING_RATE, 
            savingRateRange: savingRateRange.MONTH
        })

        checkVisitor()
    }, [])

    const checkVisitor = async () => {
        if (state.value.visitorStatus) {
            return
        } else{
            const visitorID = localStorage.getItem(local.VISITOR_ID);
            
            if(visitorID) {
                try {
                    const response = await axios<VisitorResponse>({ 
                        method: "POST", 
                        url: apiURL.CHECK_VISITOR, 
                        data: {
                            id: visitorID
                        } 
                    })
                    
                    if (response.status === 200) {
                        state.setVisitorStatus(true);
                        localStorage.setItem(local.VISITOR_FULLNAME, response.data.fullname);
                        localStorage.setItem(local.VISITOR_ADDRESS, response.data.address);
                        onClose()

                    } else {
                        onOpen()
                    }
                } catch (err) {
                    console.log(err)
                    onOpen()
                }
            } else {
                onOpen()
            }
        }
    }

    const setSavingRateRange = (range: SavingRateRangeEnum) => {
        state.setType({
            ...state.value.type,
            type:featureType.SAVING_RATE, 
            savingRateRange: range
        })
    }

    const setSavingRateIncome = (data: number | FormDetails) => {        
        state.setSavingRate({
            ...state.value.savingRate,
            income: +data
        })
    }

    const setSavingRateOtherIncome = (data: number | FormDetails) => {       
        state.setSavingRate({
            ...state.value.savingRate,
            otherIncome: +data
        })
    }

    const setSavingRateSaving = (data: number | FormDetails) => {
        state.setSavingRate({
            ...state.value.savingRate,
            saving: +data
        })
    }

    const setInvestRateInvestment = (data: number | FormDetails) => {
        state.setSavingRate({
            ...state.value.savingRate,
            investment: +data
        })
    }

    const setSavingRateInstallment = (data: number | FormDetails) => {
        state.setSavingRate({
            ...state.value.savingRate,
            installments: +data
        })
    }

    const setSavingRateExpense = (data: number | FormDetails) => {
        state.setSavingRate({
            ...state.value.savingRate,
            expenses: +data
        })
    }

    const onClickProcessResult = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        console.log(state.value.savingRate)
        
        if(isEmpties(
            state.value.savingRate?.income,
            state.value.savingRate?.saving,
            state.value.savingRate?.installment,
            state.value.savingRate?.expense
        )) {
            setIsDataEmpty(true)
            return
        }

        setIsDataEmpty(false)
        router.push({
            pathname: path.SAVING_RATE_RESULT + generateSlug(localStorage.getItem(local.VISITOR_FULLNAME) || "", getSerial())
        })
    }
    
    const getRangeDescription = () => {
        return state.value.type.savingRateRange === savingRateRange.MONTH ? "bulan ini" : "dalam setahun"
    }

    return (
        <>
            <VisitorModal 
                isOpen={isOpen} 
                onOpen={onOpen} 
                onClose={onClose} 
            />
            <div>
                <div>
                    <Button
                        onClick={() => router.back()}
                    >Kembali</Button>
                </div>

                <Heading>
                    Form pengisian saving Rate
                </Heading>
                <div>
                    <Text>Berapa lama ingin menghitung saving rate</Text>

                    <Flex>
                        <Button onClick={() => setSavingRateRange(savingRateRange.MONTH)}>Bulan ini</Button>
                        <Button onClick={() => setSavingRateRange(savingRateRange.YEAR)}>Setahun ini</Button>
                    </Flex>
                </div>

                <div>
                    <FormFeature
                        name={ "Penghasilan " + getRangeDescription() }
                        isWithDetail={false}
                        isRequired={true}
                        isEmptyCondition={isDataEmpty}
                        data={state.value.savingRate.income}
                        setData={setSavingRateIncome}
                        setDataDetail={() => {}}
                    />

                    <FormFeature
                        name="Penghasilan lain"
                        isWithDetail={true}
                        isEmptyCondition={isDataEmpty}
                        data={state.value.savingRate.otherIncome}
                        setData={setSavingRateOtherIncome}
                        dataDetail={otherIncomeDetail}
                        setDataDetail={setOtherIncomeDetail}
                    />

                    <FormFeature
                        name="Total uang yang ditabung"
                        isWithDetail={false}
                        isRequired={true}
                        isEmptyCondition={isDataEmpty}
                        data={state.value.savingRate.saving}
                        setData={setSavingRateSaving}
                        setDataDetail={() => {}}
                    />

                    <FormFeature
                        name="Total uang yang diinvestasikan"
                        isWithDetail={true}
                        isEmptyCondition={isDataEmpty}
                        data={state.value.savingRate.investment}
                        setData={setInvestRateInvestment}
                        dataDetail={investmentDetail}
                        setDataDetail={setInvestmentDetail}
                    />

                    <FormFeature
                        name={"Cicilan " + getRangeDescription()}
                        isWithDetail={true}
                        isRequired={true}
                        isEmptyCondition={isDataEmpty}
                        data={state.value.savingRate.installments}
                        setData={setSavingRateInstallment}
                        dataDetail={installmentDetail}
                        setDataDetail={setInstallmentDetail}
                    />

                    <FormFeature
                        name={"Pengeluaran " + getRangeDescription()}
                        isWithDetail={true}
                        isRequired={true}
                        isEmptyCondition={isDataEmpty}
                        data={state.value.savingRate.expenses}
                        setData={setSavingRateExpense}
                        dataDetail={expensesDetail}
                        setDataDetail={setExpensesDetail}
                    />
                </div>

                <div>
                    <Button onClick={onClickProcessResult}>Proses</Button>
                </div>
            </div>
        </>
    )
}