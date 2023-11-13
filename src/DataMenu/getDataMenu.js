import { VND } from "../changeCurrency/changeCurrency";
import { mergeData } from '../mergeData';
import { getRateKor } from "../rate";
import { instance } from "../services";

export const getDataMenu = async (type, page) => {
    const response = await instance.get(`https://www.soldout.co.kr/api/v3/search/get-item-list?&typeGb=goods&pageIndex=${page}&pageSize=12&keyword=${type}`)
    const rateKor = await getRateKor();
    const data = response.data.data.product_info.list.map(
        (item) => {
            for (let i = 0; i < item.model_no.length; i++) {
                if (item.model_no[i] === ' ' || item.model_no[i] === '/') {
                    item.model_no = item.model_no.slice(0, -item.model_no.length + i)
                }
            }

            return {
                code: item.model_no,
                type: item.brand_name_eng,
                min_priceSoldOut: VND.format(Math.floor(item.min_price*rateKor)),
                name: item.name_eng,
                img: item.image_path
            }

        }
    )
    const arrKor = []
    for(let i = 0; i<data.length;i++) {
        const result = await data[i]
        arrKor.push(result)
    }

    for(let i=0; i<arrKor.length; i++) {
        try {
            // let isPriceSnkrDunkOk = false
            // let isSnkrDunkOk = false
            // let isHistorySnkrDunkOk = false
            // // let isHistoryKreamOk = false
            // // let isPriceKreamOk = false
            // let isKreamOk = false
            // const responseJP = await instance.get(`https://snkrdunk.com/v1/products/${arrKor[i].code}/sales-history?`)
            // const responseKream = await instanceKream.get(`https://kream.co.kr/api/p/tabs/all/?keyword=${arrKor[i].code}&request_key=59f3e93d-13b1-4df1-9690-558260cb6bc3`)
            // const historySnkrDunk  = await getSalesHistorySNKRDUNK(arrKor[i].code, '');
            // if(historySnkrDunk && historySnkrDunk.length>7) {
            //     isHistorySnkrDunkOk = true
            // }
            // const min_priceJp = (Math.floor(responseJP.data.minPrice*rateJp))
            // const min_priceKream = (Math.floor(responseKream.data.items[0].product.market.lowest_ask*rateKor))
            
            // if(min_priceJp-min_priceKream>=1000000) {
            //     isPriceSnkrDunkOk = true
            // } else if(min_priceKream-min_priceJp>=1000000) {
            //     // isPriceKreamOk = true
            // }

            // if(isHistorySnkrDunkOk && isPriceSnkrDunkOk) {
            //     isSnkrDunkOk = true
            // }
            // arrKor[i] = {
            //     ...arrKor[i],
            //     min_priceJp: VND.format(min_priceJp),
            //     min_priceKream: VND.format(min_priceKream),
            //     isSnkrDunkOk: isSnkrDunkOk,
            //     isKreamOk: isKreamOk
            // }
            const fetchData = async () => {
                const data = await mergeData(arrKor[i].code);
                return data
            }
            const data = await fetchData()
            // data.price.forEach(
            //     (item) => {
            //         console.log(item)
            //         if(item.priceJp - item.priceKream > 1500000) {
            //             isPriceSnkrDunkOk = true
            //         }
            //     }
            // )
            arrKor[i] = {
                ...arrKor[i],
                isSnkrDunkOk: data.isSnkrDunkOk
                // min_priceJp: VND.format(min_priceJp),
                // min_priceKream: VND.format(min_priceKream),
                // isSnkrDunkOk: isSnkrDunkOk,
                // isKreamOk: isKreamOk
            }
        } catch(msg) {
            return arrKor
        }
    }
    // if(filter) {
    //     arrKor.forEach(
    //         (item, index) => {
    //             if(item.isSnkrDunkOk === false) {
    //                 // console.log(index)
    //                 arrKor[index] = []
    //                 // arrKor.splice(index, 1)
    //                 // console.log(arrKor.length)
    //                 // console.log(arrKor)
    //             }
    //         }
    //     )
    // }
    return arrKor
}