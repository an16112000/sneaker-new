import { getInformationKor } from "../getDataFromSoldOut/getInformationKor";
import { getData } from "../getDataFromSNKRDUNK/getDataJp";
import { getSizeAndSkuFromKream } from "../getDataFromKream/getSizeAndSku";
import { VND } from "../changeCurrency/changeCurrency";

function merge(data1, data2, data3) {
  let isSnkrDunkPriceOk = false;
  const data = data1.map((item1) => {
    let data = {};
    data2.forEach((item2) => {
      if (item1.size === item2.size) {
        data3.forEach((item3) => {
          if (item2.size === item3.size) {
            if (Math.floor(item2.price) - (1.36*Math.floor(item3.price)+820000) > 0 && item3.price !== 0) {
              isSnkrDunkPriceOk = true;
            }
            else {
              isSnkrDunkPriceOk = false
            }
            data = {
              size: item1.size,
              priceSoldOut: VND.format(Math.floor(item1.price)),
              priceJp: VND.format(Math.floor(item2.price)),
              priceKream: VND.format(Math.floor(item3.price)),
              isSnkrDunkPriceOk: isSnkrDunkPriceOk,
              listItemCountMap: item2.listItemCountMap
            };
          }
        });
      }
    });
    return data;
  });
  return data;
}

const soldOut = async (submitCode) => await getInformationKor(submitCode);
const snkrDunk = async (submitCode) => await getData(submitCode);
const kream = async (submitCode) => await getSizeAndSkuFromKream(submitCode);

async function getDataForMenu(submitCode) {
  let data;
  await Promise.all([
    soldOut(submitCode),
    snkrDunk(submitCode),
    kream(submitCode),
  ]).then((props) => {
    data = props;
  });
  return {
    dataKor: data[0],
    dataJp: data[1],
    dataKream: data[2],
  };
}

export const mergeData = async (submitCode = "") => {
  let isSnkrDunkOk = false;
  // const dataKor = await getInformationKor(submitCode)
  // const dataJp = await getData(submitCode);
  // const dataKream = await getSizeAndSkuFromKream(submitCode)
  const props = await getDataForMenu(submitCode);
  const { dataKor, dataJp, dataKream } = props;
  let data;
  if (dataKor && dataJp) {
    data = merge(dataKor.price, dataJp.price, dataKream);
    data.forEach((item) => {
      if (item.isSnkrDunkPriceOk === true) {
        isSnkrDunkOk = true;
      }
    });
  }
  const result = {
    ...data,
    code: !!dataKor ? dataKor.code : null,
    img: !!dataKor ? dataKor.img : null,
    name: !!dataKor ? dataKor.name_eng : null,
    price: !!dataKor ? data : null,
    isSnkrDunkOk: isSnkrDunkOk,
  };
  return result;
};
