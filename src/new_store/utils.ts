let seed = 0;
/**
 * @desc 生成reducer唯一key
 * @param {string} ns 命名空间
 */
export function createReducerKey(ns = '') {

  const prefix = ns ? `${ns}-` : '';
  const randomStr = Math.random()
    .toString()
    .substr(2, 4);

  seed += 1;
  const key = `${prefix}${Date.now()}-${randomStr}-${seed}`;

  return key;
}

export interface IAction {
  type: string;
  [propName: string]: any;
}

export interface IGetState {
  (): {
    [propName: string]: any;
  };
}

export interface IDispatch {
  (
    action:
      | {
          (dispatch: IDispatch, getState: IGetState): void;
        }
      | {
          type: string;
          [propName: string]: any;
        }
  ): void;
}


// 统一的获取Key的方法
export const getTypePrefix = (key = '', ns = ''): string =>
  `${ns ? `${ns.toUpperCase()}_` : ''}SET_${key.toUpperCase()}`;

/**
 * @desc 精简模板代码，用来将一个key value转换成reducer
 * @param type
 * @param initState
 * @returns {Function}
 */
export const makeReducer = <T>(type: string, initState: T) => (
  state = initState,
  action: { type: string; payload: any; [propName: string]: any }
): T => {
  const payloadType = Object.prototype.toString.call(action.payload);

  switch (action.type) {
    // 只需要处理当前type的action。兼容一下Object和Array的情况
    case type:
      if (payloadType === '[object Object]') {
        return { ...action.payload };
      }

      if (payloadType === '[object Array]') {
        return [...action.payload] as any;
      }

      return action.payload;
    default:
      return state;
  }
};

type TMakeReducersReturnType<T> = {
  [K in keyof T]: T[K] extends (...args: any) => any ? T[K] : () => T[K];
};

/**
 * @desc 根据对象生成reducer，type命名规则：`${ns.toUpperCase}_SET_${key.toUpperCase()}`
 */
export const makeReducers = <T extends Record<string, any>>(obj: T, ns: string): TMakeReducersReturnType<T> => {
  const reducers = {} as TMakeReducersReturnType<T>;

  for (const [key, val] of Object.entries(obj)) {
    // 如果已经是一个reducer，不进行包装
    reducers[key] = typeof val === 'function' ? val : makeReducer(getTypePrefix(key, ns), val);
  }

  return reducers;
};

/**
 * 将一个 reducer 对象 封装成 数组
 * @param reducer 要包装的reducer
 * @param ns 命名空间，会在命名空间前加 ADD_ 和 DEL_ 作为添加或者删除的标识
 */
export function makeArrayReducer<T extends (...args: any) => any>(reducer: T, ns = '') {
  // 这里重新定义类型，避免循环引用的问题
  type ReducerType = ReturnType<T>;

  return (state: ReducerType[] = [], action: IAction): ReducerType[] => {
    const { type, unikey } = action;

    // 新增
    if (type === `ADD_${ns.toUpperCase()}`) {
      return [...state, reducer(action.payload as ReducerType, action)];
    }

    // 删除
    if (unikey && type === `DEL_${ns.toUpperCase()}`) {
      return state.filter((item) => item.unikey !== unikey);
    }

    // 修改
    let newState = state;

    if (state.length) {
      newState = state.map((item) => {
        // 1. 没有传入unikey，说明全部广告都要修改
        // 2. 传入unikey，只改对应的广告
        if (!unikey || item.unikey === unikey) {
          // 这里其实是调用reducer，reducer会返回一个新的对象。我们会传入每个单独的广告。
          // 其实这里就不是redux帮我们调用reducer了，而是我们自己调用reducer。所有第一个参数我们可控
          return reducer(item, action);
        }

        // 传入unikey，并且没有匹配上unikey的广告不需要修改
        return item;
      });
    }

    return newState;
  };
}


/**
 * @desc 生成更新reducer函数。通过包装一个dispatch函数，同时自动生成action，保证和reducer一直。开发者无需关注
 */
export const makeUpdateFn = <T>(ns: string) => (obj: Partial<T> & { unikey?: string }) => (
  dispatch: IDispatch
): void => {
  const { unikey } = obj;

  for (const [key, val] of Object.entries(obj)) {
    if (key !== 'unikey') { // unikey不需要dispatch
      dispatch({
        type: getTypePrefix(key, ns),
        unikey, // 这里如果有unikey，就只修改对应的广告。具体逻辑在makeArrayReducer中
        payload: val,
      });
    }
  }
};
