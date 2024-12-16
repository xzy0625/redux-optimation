// actions

import { adgroupDefault, TAdgroup } from "./adgroup";
import { IDispatch } from "./utils";

// 添加广告
export const addAdGroup = (adgroup: Partial<TAdgroup> = {}) => (
  dispatch: IDispatch
): void => {
  dispatch({
    type: 'ADD_ADGROUP', // 这个type要和makeArrayReducer中的ADD type一致
    payload: adgroup || adgroupDefault, // 插入一个新广告
  })
};

// 删除广告
export const deleteAdGroup = (unikey: string) => (
  dispatch: IDispatch
): void => {
  dispatch({
    unikey,
    type: 'DEL_ADGROUP', // 这个type要和makeArrayReducer中的ADD type一致
  })
};
