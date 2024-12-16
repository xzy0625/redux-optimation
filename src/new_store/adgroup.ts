import { combineReducers } from "redux";
import { createReducerKey, makeArrayReducer, makeReducers, makeUpdateFn } from "./utils";

export const adgroupDefault = {
  unikey: (state = createReducerKey('adgroup')) => state,
  name: '',
  adgroup_id: 0,
  begin_time: 0,
  end_time: 0,
}


// 通过makeReducers创建reducer。这样子每一个字段其实都是一个reducer。
export const adgroupReducer = combineReducers(makeReducers(adgroupDefault, 'adgroup'));

export const adgroupsReducer = makeArrayReducer(adgroupReducer, 'adgroup');

export type TAdgroup = ReturnType<typeof adgroupReducer>;

// 批量更新函数eg: updateAdGroup({ adgroup_name: '广告名称' })
export const updateAdGroup = makeUpdateFn<TAdgroup>('adgroup');
