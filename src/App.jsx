import React, { useState } from 'react'
import './App.css'


export const App = () => {

  const [nation, setNation] = useState("");
  const [goldMedal, setGoldMedal] = useState(0);
  const [silverMedal, setSiverMedal] = useState(0);
  const [cuMedal, setCuMedal] = useState(0);
  const [nationList, setNationList] = useState([]);
  //////////////////////////////////////////
  const addNationHandler = () => {
    const newNation = {
      id: new Date().getTime(),
      nation: nation,
      geum: goldMedal,
      eun: silverMedal,
      dong: cuMedal,
    }
    console.log(newNation);
    if (newNation.nation === "") {
      alert("nation's name is null");
      return;
    }

    const isIncluded = () => {
      return nationList.some((e) => {
        return e.nation === newNation.nation;
      })
    };

    if (isIncluded() === true) {
      alert("nation's name already included");
      return;
    }
    setNationList([...nationList, newNation]);
    setNation("");
  };

  const totalMedal = (e) => {
    let res = e.geum + e.eun + e.dong;
    return res;
  }

  const deleteBtn = (selctedNation) => {
    const filteredNation = nationList.filter((nation) => {
      return selctedNation !== nation;
    });
    setNationList(filteredNation);
  }
  //////////////////////////////////////
  const updateNationHandler = () => {
    const newNation = {
      id: new Date().getTime(),
      nation: nation,
      geum: goldMedal,
      eun: silverMedal,
      dong: cuMedal,
    }
    console.log(newNation);
    if (newNation.nation === "") {
      alert("nation's name is null");
      return;
    }


    const isIncluded = nationList.some((e) => {
      return e.nation === newNation.nation;
    });

    if (isIncluded) {
      //todo: 업데이트 버튼 클릭시 값을 업데이트 
      const res = nationList.map((selectedNation) => {
        if (selectedNation.nation === newNation.nation) {
          return newNation;
        } else {
          return selectedNation;
        }
      });
      setNationList(res);
    } else {
      alert(`there's no nation name like ${newNation.nation}
        && isIncluded = ${isIncluded()}`);
    }
  };
  /////////////////////////////////////
  return (
    <div className='tableContainer'>
      <div className='first'>
        <h1 className='title'>2024파리 올림픽</h1>
        <table className='table'>
          <tbody>
            <tr>
              <th>국가명</th>
              <th>금메달</th>
              <th>은메달</th>
              <th>동메달</th>
            </tr>
            <tr>
              <td><input type='text' value={nation} onChange={(event) => {
                setNation(event.target.value);
              }}></input></td>
              <td><input type='number' value={goldMedal} onChange={(event) => {
                setGoldMedal(Number(event.target.value));
              }}></input></td>
              <td><input type='number' value={silverMedal} onChange={(event) => {
                setSiverMedal(Number(event.target.value));
              }}></input></td>
              <td><input type='number' value={cuMedal} onChange={(event) => {
                setCuMedal(Number(event.target.value));
              }}></input></td>
              <td><button className='addBtn' onClick={addNationHandler}>국가 추가</button></td>
              <td><button className='updateBtn' onClick={updateNationHandler}>업데이트</button></td>
            </tr>
          </tbody>
        </table>
        <br></br>
        <span className='comment'>test =</span>
      </div>

      <div className='result'>
        <table className='list'>
          <tbody>
            <tr>
              <th>국가명</th>
              <th>금메달</th>
              <th>은메달</th>
              <th>동메달</th>
              <th>총 메달</th>
            </tr>
            {nationList.map((nation) => {
              return <tr key={nation}>
                <td>{nation.nation}</td>
                <td>{nation.geum}</td>
                <td>{nation.eun}</td>
                <td>{nation.dong}</td>
                <td>{totalMedal(nation)}</td>
                <button onClick={function () {
                  return deleteBtn(nation);
                }}>삭제</button>
              </tr>
            })}
          </tbody>
        </table>
      </div>
    </div >
  )
}

export default App;