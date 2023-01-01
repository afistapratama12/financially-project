import { FinancialStatementObject, UserFinancialStatementObject } from "@/module/internal/financialStatement/entity";
import { SavingRateObject } from "@/module/internal/savingRate/entity";
import { createContext, useContext, useState } from "react";
import { FeatureProps } from "../props";

// bug in react-native 0.63.2
// parameter must be optional, not required
const AppContext = createContext(undefined as any);

export function AppWrapper({ children }: any) {
  const [visitorStatus, setVisitorStatus] = useState<boolean>(false);
  const [typeData, setTypeData] = useState<FeatureProps>({} as FeatureProps);
  const [savingRateData, setSavingRateData] = useState<SavingRateObject>({} as SavingRateObject);
  const [financialStatementData, setFinancialStatementData] = useState<FinancialStatementObject | UserFinancialStatementObject>({} as FinancialStatementObject | UserFinancialStatementObject);

  let shareState = {
    value: {
        visitorStatus,
        type: typeData,
        savingRate: savingRateData,
        financialStatement: financialStatementData
    },
    setVisitorStatus,
    setType: setTypeData,
    setSavingRate: setSavingRateData,
    setFinancialStatement: setFinancialStatementData
  }

  return (
    <AppContext.Provider value={shareState}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  return useContext(AppContext);
}


