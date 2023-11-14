import { useState } from 'react';
import ConditionCard from './components/ConditionCard';
import './App.css';
import $_conditions from "./assets/strings/conditions.json";
const $conditions :Record<string, {symbol: string, desc: string}> = $_conditions;
import _acceptableWords from './assets/wordlist-stuff/acceptable-words.json' ;
const acceptableWords :Record<number, string[]> = _acceptableWords;

function App() {
  const [word, setWord] = useState('');
  const [inputWord, setInputWord] = useState('');
  const [conditions, setConditions] = useState([
    'etario', 
    'any',
    "etario", 
    "etario"
  ]);

  const satisfiedConds = satisfiesConditions(inputWord, conditions);
  
  const isInvalidInput = (inputWord.length === conditions.length) ? (!acceptableWords[inputWord.length]?.includes(inputWord)) : null;

  return (
    <>
      <main>
        <section className='conditions'>
          {
            conditions.map((condition, i) => {
              return (
                <ConditionCard 
                  satisfication_state={(satisfiedConds[i] === null) ? "blank" : satisfiedConds[i] ? "satisfied" : "unsatisfied" }
                  display_symbol={$conditions[condition].symbol} 
                  display_text={$conditions[condition].desc}
                  key={i} 
                />
                
              )
            })
          }
        </section>
        <section className="user-input">
          <input 
            type="text"
            className={`${isInvalidInput? "invalid-input" : ""}`}
            maxLength={conditions.length}
            spellCheck={false}
            value={inputWord}
            onChange={e => setInputWord(e.target.value)}
          />
        </section>
      </main>
    </>
  )
}

export default App;

function satisfiesConditions(word: string, conditions: string[]): (boolean|null)[] {

  let out = conditions.map((v, i) => {
    if (!word[i]) return null;
    switch (v) {
      case "any" :
        return true;
      case "any-norepeats" :
        return word.split('').length == (new Set(word.split(''))).size
      case "etario" : 
        return "etario".includes(word[i]);
    }
    return true;
  })
  
  return out;
}