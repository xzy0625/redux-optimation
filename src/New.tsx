import { useDispatch, useSelector } from 'react-redux'
import { AdGroupContext, useAdGroupState } from './new_store/hooks';
import { addAdGroup, deleteAdGroup } from './new_store/actions';
import { IDispatch } from './new_store/utils';
import { RootState } from './new_store';

const Adgroup = (adgroup: any) => {
  const [name, setName] = useAdGroupState('name');
  const [beiginTime, setBeiginTIme] = useAdGroupState('begin_time');
  const dispatch = useDispatch() as IDispatch;
  return <div style={{ marginTop: '40px' }}>
    <div>
      <button onClick={() => dispatch(deleteAdGroup(adgroup.uniKey))}>删除当前广告</button>
    </div>
    <div>
    <span>广告名称</span>
      <input type="text" value={name} onChange={(e) => {
        console.log(e.target.value);
        setName(e.target.value)
      }} />
    </div>
    <div>
      <span>开始时间</span>
      <input type="text" value={beiginTime} onChange={(e) => {
        console.log(e.target.value);
        setBeiginTIme(e.target.value)
      }} />
    </div>
  </div>
}

function App() {

  const adgroups = useSelector<RootState, any[]>(
    (state) => state.adgroups.map((item) => item),
  );

  const dispatch = useDispatch() as IDispatch;

  return (
    <div style={{ marginTop: 40 }}>
      <h1>使用优化后的redux</h1>
      <div>
        <button onClick={() => dispatch(addAdGroup())}>添加一个广告</button>
      </div>
      {
        adgroups.map(adgroup => {
          return <div key={adgroup.unikey}>
            {/* 使用context传入unikey */}
            <AdGroupContext.Provider value={{
              unikey: adgroup.unikey
            }}>
              <Adgroup adgroup={adgroup} />
            </AdGroupContext.Provider>
          </div>
        })
      }
      <div style={{ marginTop: 20 }}>
        当前redux内容：
        <div>
          {JSON.stringify(adgroups, null, 2)}
        </div>
      </div>
    </div>
  )
}

export default App
