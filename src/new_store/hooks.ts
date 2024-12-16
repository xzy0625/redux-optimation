import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '.';
import { TAdgroup, updateAdGroup } from './adgroup';
import { IDispatch } from './utils';

const context = {
  unikey: '', // 前端生成的唯一key
};

export const AdGroupContext = React.createContext(context);

// 读取第一个广告且更新所有广告的某个属性值，某个属性在多个广告中要保持一致的场景使用，比如：广告位、视频号推广类型
export function useFirstAdGroupStateButUpdateAll<T extends keyof TAdgroup>(key: T) {
  const value = useSelector<RootState>((state) => {
    return state.adgroups?.[0]?.[key];
  }) as TAdgroup[T];

  const dispatch = useDispatch() as IDispatch;
  const setValue = (val: TAdgroup[T]) => {
    dispatch(updateAdGroup({ [key]: val })); // 只要不传入unikey，就会更新所有广告
  };

  return [value, setValue] as [TAdgroup[T], typeof setValue];
}

// 通过unikey读取和更新对应单个广告数据的某个属性值
export function useAdGroupStateByUnikey<T extends keyof TAdgroup>(
  unikey: string,
  key: T
) {
  const dispatch = useDispatch() as IDispatch;

  // 通过unikey读取广告数据
  const value = useSelector<RootState>((state) => {
    const adgroup = state.adgroups.find((item) => item.unikey === unikey);
    return adgroup?.[key];
  })

  // 通过unikey更新广告数据。这里只要传入unikey，后面在makeReducer中会自动更新对应的广告数据
  const setValue = (value: TAdgroup[T]) => {
    if (unikey) {
      dispatch(updateAdGroup({ unikey, [key]: value }));
    }
  }


  return [value, setValue] as [TAdgroup[T], typeof setValue];
}

// 通过context获取unikey（适用于包含在Adgroup.tsx的内部组件调用），读取和更新对应单个广告数据的某个属性值
// 最后使用方式如下：const [name, setName] = useAdGroupState('name');
export function useAdGroupState<T extends keyof TAdgroup>(key: T) {
  const { unikey } = useContext(AdGroupContext);

  console.log('unikey', unikey);

  return useAdGroupStateByUnikey(unikey, key);
}
