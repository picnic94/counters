import './App.css';
import Cookies from 'universal-cookie';
import { useState } from 'react';

const cookies = new Cookies();

const App = () => {

  const initState = cookies.get('state');
  const [correct, setCorrect] = useState((initState && initState.correct) || 0)
  const [wrong, setWrong] = useState((initState && initState.wrong) || 0)
  const [saved, setSaved] = useState((initState && initState.saved))

  const onClickCorrect = (evt) => {
    setCorrect(correct + 1)
    // updateCookie()
  }

  const onClickWrong = (evt) => {
    setWrong(wrong + 1)
    // updateCookie()
  }

  const onClickClear = (evt) => {
    setCorrect(0);
    setWrong(0);
    setSaved(null);
    cookies.set('state', null, { path: '/' })
  }

  const updateCookie = () => {
    cookies.set('state', { correct, wrong, saved: new Date() }, { path: '/', expires: new Date(new Date().getTime() + 365 * 24 * 3600000) })
    console.log(cookies.get('state'));
  }

  window.onbeforeunload = () => {
    updateCookie()
  }

  const calcPerc = (value, total, decimals = 2) => {
    if (total === 0) {
      return '0'
    }

    let ret = value / total * 100

    return ret.toFixed(2)


  }

  return (
    <div className="App">
      <header className="App-header">
        <span>
          <button onClick={onClickClear}>Clear session</button>
          <span>
            {
              saved ? <p className="timestamp">Session saved: {new Date(saved).toLocaleString()}</p> : null}
          </span>
        </span>
        <div style={{ width: '100%', diplay: 'grid', justifyContent: 'center' }}>
            <div style={{ fontSize: '2rem', display: 'inline-flex', gap: '1rem'}}>
              <span>Total answered:</span><span>{correct + wrong}</span>
            </div>
            <br/>
            <div style={{ fontSize: '2.5rem', display: 'inline-flex', gap: '1rem'}}>
              <span>Next:</span><span>{correct + wrong+1}</span>
            </div>
        </div>
        <div className="App-body">
          <div className='correct-group'>
            <p>{calcPerc(correct, (correct + wrong))}%</p>
            <p>{correct}</p>
            <button onClick={onClickCorrect}>Correct</button>
          </div>
          <div className='wrong-group'>
            <p>{calcPerc(wrong, (correct + wrong))}%</p>
            <p>{wrong}</p>
            <button onClick={onClickWrong}>Wrong</button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
