import axios from "axios";
import { getRateJp } from "../rate";


export const getData = async (submitCode) => {
    try {
        const data = await axios.get(`https://snkrdunk.com/v1/sneakers/${submitCode}/size/list`)
        const arr = data.data.data.minPriceOfSizeList;
        const listingItemCountMap = data.data.data.listingItemCountMap;
        arr.sort(function (a, b) {
            return a.size - b.size
        })
        const rateJp = await getRateJp();
        const price = arr.map(
            item => {
                let listItemCountMap = 0
                for (let size in listingItemCountMap) {
                    size = parseInt(size)
                    if(size === item.size) {
                        listItemCountMap = listingItemCountMap[size]
                    }
                }
                return {
                    size: ((5-(item.size-18)*0.5)+item.size)*10,
                    price: item.price*rateJp,
                    listItemCountMap: listItemCountMap,
                }
            }
        )
        const infor = {
            code: submitCode,
            price: [...price]
        }
        return infor;
    } catch (error) {
        return alert('Loi');
    }

}

