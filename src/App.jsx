import React, { useState, useRef } from 'react'
import './App.css'
import '../components/button.jsx'
import Button from '../components/button.jsx';
import Modal from '../components/Modal.jsx'

export const App = () => {

  const [nation, setNation] = useState("");
  const [goldMedal, setGoldMedal] = useState(0);
  const [silverMedal, setSiverMedal] = useState(0);
  const [cuMedal, setCuMedal] = useState(0);
  const [nationList, setNationList] = useState([]);
  const [addComment, setAddComment] = useState("국가 추가");
  const [updateComment, setUpdateComment] = useState("업데이트");
  const [modal, setModal] = useState(false);
  const [sortedList, setSortedList] = useState();

  if(goldMedal < 0){
    setGoldMedal(0);
  }else if(silverMedal < 0){
    setSiverMedal(0);
  }else if(cuMedal < 0){
    setCuMedal(0);
  }
  
  const modalRef = useRef(null);
  
  React.useEffect(() => {
    if (modal) {
      if (modalRef.current) {
        modalRef.current.classList.add('active-modal');
      }
    } else {
      if (modalRef.current) {
        modalRef.current.classList.remove('active-modal');
      }
    }
  }, [modal]);

  const toggleModal = () => {
    setModal(!modal);
  };

  const newNation = {
    id: new Date().getTime(),
    nation: nation,
    geum: goldMedal,
    eun: silverMedal,
    dong: cuMedal,
  };

  const isIncluded = nationList.some((e) => {
    return e.nation === newNation.nation;
  });
  /////////////////////////////////////////
  
  //업데이트 버튼 눌렀을때
  const updateNationHandler = () => {
    if (newNation.nation === "") {
      toggleModal();
      return;
    }
    
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
      console.log(modal);
      toggleModal();
      setNation("");
      setCuMedal(0);
      setGoldMedal(0);
      setSiverMedal(0);
    }
  };
  //////////////////////////////////////////
  const addNationHandler = () => {

    if (newNation.nation === "") {
      toggleModal();
      return;
    }

    if (isIncluded === true) {
      toggleModal();
      return;
    }

    if(isNaN(newNation.nation)){

    }else{
      toggleModal();
      setNation("");
      return;
    }
      
    setNationList([...nationList, newNation]);
    setSortedList(nationList.sort((a,b) => b.geum - a.geum));
    console.log(sortedList);
    setNation("");
    setCuMedal(0);
    setGoldMedal(0);
    setSiverMedal(0);
  };
  /////////////////////////////////////////////
  const totalMedal = (e) => {
    let res = e.geum + e.eun + e.dong;
    return res;
  }
  ////////////////////////////////////////////
  const deleteBtn = (selctedNation) => {
    const filteredNation = nationList.filter((nation) => {
      return selctedNation !== nation;
    });
    setNationList(filteredNation);
  }
  //////////////////////////////////////

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
                setGoldMedal(+event.target.value);
              }}></input></td>
              <td><input type='number' value={silverMedal} onChange={(event) => {
                setSiverMedal(Number(event.target.value));
              }}></input></td>
              <td><input type='number' value={cuMedal} onChange={(event) => {
                setCuMedal(Number(event.target.value));
              }}></input></td>
              <td><Button className={'addBtn'} event={addNationHandler} comment={addComment} /></td>
              <td><Button className={'updateBtn'} event={updateNationHandler} comment={updateComment} /></td>
            </tr>
          </tbody>
        </table>
        <br></br>
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
            {sortedList.map((nation) => {
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

      {modal && (<Modal
        ref={modalRef}
        modalOption={toggleModal}
        firstClassName={'overlay'}
        secondClassNam={'modal-content'}
        closeBtnClass={'close-modal'}
        modalContent={'잘못된 접근 입니다.'}
      />
      )}
    </div >
  )


}

export default App;