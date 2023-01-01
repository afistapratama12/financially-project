import ErrorModalResult from "@/components/modal/ErrorModalResult"
import {  BalanceSheetObject, ProfitLossObject, StatementChangeEquityObject } from "@/module/internal/financialStatement/entity"
import { isEmpty } from "@/module/internal/helper/empty"
import { useAppContext } from "@/src/context/AppContext"
import { LocalFinancialStatementHistoryProps, ResultPageProps } from "@/src/props"
import { local } from "@/src/props/const"
import { GetServerSidePropsContext } from "next"
import { useEffect, useState } from "react"

export const GetServerSideProps = async ({ 
    params, 
    ...ctx 
}: GetServerSidePropsContext) => {
    const id = params?.resultId

    return {
        props: {
            id
        } as ResultPageProps
    }
}

export default function financialStatementResult({ 
    id 
}: ResultPageProps) {
    const state = useAppContext()

    const [visitorFN, setVisitorFN] = useState<string>();
    const [errorEmpty, setErrorEmpty] = useState<boolean>(false)
    const [financialStatementData, setFinancialStatementData] = useState<LocalFinancialStatementHistoryProps>({} as LocalFinancialStatementHistoryProps)
    const [balanceSheetData, setBalanceSheetData] = useState<BalanceSheetObject>({} as BalanceSheetObject)
    const [profilLossData, setProfitLossData] = useState<ProfitLossObject>({} as ProfitLossObject)

    const getFinancialStatementInformation = () => {
        const financialStatementHistory = localStorage.getItem(local.FINANCIAL_STATEMENT_HISTORY)
        const financialStatementHistoryData = JSON.parse(financialStatementHistory as string) as LocalFinancialStatementHistoryProps[]

        // if state is not empty (user just process the data)
        if (!isEmpty(state.value.type) && !isEmpty(state.value.financialStatement)) {
            const financialStatementProcess = {
                id,
                type: state.value.type,
                data: state.value.financialStatement
            } as LocalFinancialStatementHistoryProps

        } else {

        }
    }

    useEffect(() => {
        getFinancialStatementInformation()
    },[])

    if(errorEmpty) return <ErrorModalResult />

    return (
        <>
        </>
    )
}