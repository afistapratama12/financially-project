import { FormFeatureProps } from "@/src/props";
import { Button, Flex, Input, Text } from "@chakra-ui/react";
import { useState } from "react";

export default function FormFeature({
    name,
    isWithDetail,
    data,
    setData,
    dataDetail,
    setDataDetail,
}: FormFeatureProps) {
    const [isDataDetail, setIsDataDetail] = useState<boolean>(false);

    const addDataDetail = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        setDataDetail([
            ...dataDetail ? dataDetail : [],
            {
                name: "",
                amount: 0,
            }
        ])

        setData(dataDetail)
    }

    const changeNameDetail = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        e.preventDefault();

        const newDetail = dataDetail ? [...dataDetail] : []
        newDetail[index].name = e.target.value
        setDataDetail(newDetail)
        setData(newDetail)
    }

    const changeAmountDetail = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        e.preventDefault();

        const newDetail = dataDetail ? [...dataDetail] : []
        newDetail[index].amount = parseInt(e.target.value)
        setDataDetail(newDetail)
        setData(newDetail)
    }

    return (
        <div>
            <Text>{name}</Text>
            {
                isWithDetail && isDataDetail ? (
                    <>
                        {
                            dataDetail?.map((detail, index) => (
                                <Flex key={index}>
                                    <Input
                                        value={detail.name}
                                        onChange={e => changeNameDetail(e, index)}
                                        placeholder="eg. Jualan Produk"
                                    />

                                    <Input
                                        value={detail.amount}
                                        onChange={(e) => changeAmountDetail(e, index)}
                                        type="number"
                                        placeholder="eg. 1000000"
                                    />
                                </Flex>
                            ))
                        }

                        <Flex>
                            <Button
                                onClick={addDataDetail}
                            >Tambah
                            </Button>

                            <Button
                                onClick={(e) => setIsDataDetail(false)}
                            >Batal Merinci
                            </Button>
                        </Flex>
                    </>
                ) : (
                    <Flex>
                        <Input
                            value={data}
                            onChange={(e) => setData(e.target.value)}
                            type="number"
                            placeholder="eg. 1000000"
                        />
                        {
                            isWithDetail && (
                                <Button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setIsDataDetail(true);
                                    }}
                                >
                                    Ingin Merinci
                                </Button>
                            )
                        }
                    </Flex>
                )
            }
        </div>
    )   
}