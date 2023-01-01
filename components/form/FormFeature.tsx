import { FormDetail, FormDetails } from "@/module/internal/entity";
import { isEmpty } from "@/module/internal/helper/empty";
import { formatToCurrency } from "@/src/helper/helper";
import { FormFeatureProps } from "@/src/props";
import { Button, Flex, Input, Text } from "@chakra-ui/react";
import { useState } from "react";

export default function FormFeature({
    name,
    isWithDetail,
    isEmptyCondition,
    isRequired = false,
    data = 0,
    setData,
    dataDetail = [],
    setDataDetail
}: FormFeatureProps) {
    const [isDataDetail, setIsDataDetail] = useState<boolean>(false);
    const [localDataNoDetail, setLocalDataNoDetail] = useState<any>();

    const addDataDetail = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {        
        setDataDetail([
            ...dataDetail ? dataDetail : [],
            {
                name: "",
                amount: 0,
            }
        ])
    }

    const changeNameDetail = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newDetail = dataDetail.length > 0 ? [...dataDetail] : [{ name: "", amount: 0}]
        newDetail[index].name = e.target?.value

        setDataDetail(newDetail)
        setData(newDetail)
    }

    const changeAmountDetail = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newDetail = dataDetail.length > 0 ? [...dataDetail] : [{ name: "", amount: 0}]
        const str = e.target?.value
        if(!str) {
            newDetail[index].amount = 0
            setDataDetail(newDetail)
            setData(newDetail)
            return

        }
        const res = str.replace(/[^0-9]/g, "")
        newDetail[index].amount = parseInt(res)

        setDataDetail(newDetail)
        setData(newDetail)
    }

    const changeInputData = (e: React.ChangeEvent<HTMLInputElement>) => {        
        // eliminate character that is not number
        const str = e.target?.value
        const res = str.replace(/[^0-9]/g, "")

        if(isEmpty(res)) return setData(0)
        setData(parseInt(res))
    }

    const changeToDetail = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setDataDetail(dataDetail.length > 0 ? [...dataDetail] : [{
            name: "",
            amount: 0,
        }])
        setLocalDataNoDetail(data)
        setIsDataDetail(true)
    }

    const changeToNoDetail = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setData(localDataNoDetail)
        setIsDataDetail(false)
    }

    const showErrorEmptyNoDetail = (): boolean => {
        if (isEmptyCondition && isRequired && (isEmpty(data) || data === 0) && !isDataDetail) return true
        return false
    }

    const showErrorEmptyDetail = (idx: number, detail: FormDetail): boolean => {
        if(isEmptyCondition && isRequired && idx === 0 && (detail.name === "" || detail.amount === 0)) return true
        return false
    }

    return (
        <div>
            <Text>{name}</Text>
            {
                isWithDetail && isDataDetail && (
                    <>
                        {
                            dataDetail.map((detail, index) => (
                                <div>
                                <Flex key={index}>
                                    <Input
                                        value={detail.name}
                                        onChange={e => changeNameDetail(e, index)}
                                        type="string"
                                        placeholder="eg. Jualan Produk"
                                    />

                                    <Input
                                        value={formatToCurrency(detail.amount)}
                                        onChange={(e) => changeAmountDetail(e, index)}
                                        type="string"
                                        placeholder="eg. 1.000.000"
                                    />
                                </Flex>
                                <Text
                                    color={"red"}
                                >{showErrorEmptyDetail(index, detail) && "mohon lengkapi data ini"}</Text>
                                </div>
                            ))
                        }

                        <Flex>
                            <Button
                                onClick={addDataDetail}
                            >Tambah
                            </Button>

                            <Button
                                onClick={changeToNoDetail}
                            >Batal Merinci
                            </Button>
                        </Flex>
                    </>
                ) 
            }
                
            {   
                !isDataDetail && (
                    <Flex>
                        <Input
                            value={formatToCurrency(data)}
                            onChange={changeInputData}
                            type="string"
                            placeholder="eg. 1.000.000"
                        />
                        
                        {
                            isWithDetail && (
                                <Button
                                    onClick={changeToDetail}
                                >
                                    Ingin Merinci
                                </Button>
                            )
                        }
                    </Flex>
                )
            }
            
            <Text
                color={"red.500"}
            >{showErrorEmptyNoDetail() && "mohon lengkapi data ini"}</Text>
        </div>
    )
}