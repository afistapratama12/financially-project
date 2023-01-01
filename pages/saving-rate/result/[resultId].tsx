
import ErrorModalResult from "@/components/modal/ErrorModalResult";
import { isEmpties, isEmpty } from "@/module/internal/helper/empty";
import { CalculationSavingRate } from "@/module/internal/savingRate";
import { useAppContext } from "@/src/context/AppContext";
import { findSavingRateHistory } from "@/src/helper/localStorage";
import { LocalSavingRateHistoryProps, ResultPageProps } from "@/src/props";
import { local } from "@/src/props/const";
import { Box, CircularProgress, CircularProgressLabel, Heading, Text } from "@chakra-ui/react";
import {  GetServerSidePropsContext } from "next";
import { useEffect, useState } from "react";

export const getServerSideProps = async ({ 
    params, 
    ...ctx 
}: GetServerSidePropsContext) => {
    const id = params?.resultId as string

    return {
        props: {
            id
        } as ResultPageProps
    }
}

export default function savingRateResult({ 
    id 
}: ResultPageProps) {
    const state = useAppContext()

    const [visitorFN, setVisitorFN] = useState<string>();
    const [errorEmpty, setErrorEmpty] = useState<boolean>(false)
    const [savingRateData, setSavingRateData] = useState<LocalSavingRateHistoryProps>({} as LocalSavingRateHistoryProps)

    const getSavingRateInformation = () => {        
        const savingRateHistory = localStorage.getItem(local.SAVING_RATE_HISTORY)
        const savingRateHistoryData = JSON.parse(savingRateHistory as string) as LocalSavingRateHistoryProps[]

        // if state is not empty (user just process the data)
        if (!isEmpty(state.value.type) && !isEmpty(state.value.savingRate)) {
            const savingRateProcess = {
                id, 
                type: state.value.type, 
                data: state.value.savingRate
            } as LocalSavingRateHistoryProps
            
            if (!savingRateProcess.data.savingRate) savingRateData.data = CalculationSavingRate(savingRateProcess.data)

            setSavingRateData(savingRateProcess)

            // update localSavingRateHistory in localStorage
            if (isEmpty(savingRateHistoryData)) return localStorage.setItem(local.SAVING_RATE_HISTORY, JSON.stringify([savingRateProcess]))
            if (savingRateHistoryData.length >= 10) {
                savingRateHistoryData.shift()
                savingRateHistoryData.push(savingRateProcess)
                return localStorage.setItem(local.SAVING_RATE_HISTORY, JSON.stringify(savingRateHistoryData))
            } 
                
            savingRateHistoryData.push(savingRateProcess)
            return localStorage.setItem(local.SAVING_RATE_HISTORY, JSON.stringify(savingRateHistoryData))
        } else {
            if(isEmpties(savingRateHistoryData)) return setErrorEmpty(true)
            const savingRateData = findSavingRateHistory(savingRateHistoryData, id as string)

            if(isEmpties(savingRateData)) return setErrorEmpty(true)
            
            setSavingRateData(savingRateData)
        }
    }

    const getResultCircurlarColor = (rate: number): string => {
        if(rate > 0.1) return "green.300"
        if(rate <= 0.1 && rate > 0.049) return "orange.300"
        if(rate <= 0.049 && rate >= 0) return "red.300"
        return "blackAlpha.300"
    }

    useEffect(() => {
        setVisitorFN(localStorage.getItem(local.VISITOR_FULLNAME) as string)
        getSavingRateInformation()
    }, [id])

    if(errorEmpty) return <ErrorModalResult />
    
    return (
        <>
           <div>
                <Heading>Result saving rate</Heading>
                
                <Box>
                    <CircularProgress 
                        value={100} 
                        color={getResultCircurlarColor(savingRateData.data?.savingRate || 0)} 
                        size="200px"
                    >
                        <CircularProgressLabel
                            fontSize="4xl"
                        >{(savingRateData.data?.savingRate || 0) * 100}%</CircularProgressLabel>
                    </CircularProgress>
                </Box>

                <Box>
                    <Heading>Analisis:</Heading>
                    <Text>hi, {visitorFN}</Text>
                </Box>
            </div> 
        </>
    )
}