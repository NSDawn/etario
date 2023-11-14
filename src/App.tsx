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
    'next-antecedent', 
    'any',
    "etario", 
    "etario"
  ]);

  const _inputWord = cleanInputWord(inputWord);
  if (_inputWord !== inputWord) setInputWord(_inputWord);

  const satisfiedConds = satisfiesConditions(inputWord, conditions);
  
  const isInvalidInput = (inputWord.length === conditions.length) ? (!acceptableWords[inputWord.length]?.includes(inputWord)) : null;

  return (
    <>
      <header>
        <h1>etario</h1>
        <h2>a constraint-based word game</h2>
      </header>
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
          {
            isInvalidInput && inputWord[inputWord.length -1] === 's' ?
            <div className="no-plurals">no plurals!</div>
            :null
          }
          
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
      case "norepeats" :
        return word.split('').length == (new Set(word.split(''))).size
      case "etario" : 
        return "etario".includes(word[i]);
      case "kjvxzq" : 
        return "kjvxzq".includes(word[i]);
      case "first" :
        return word[i].charCodeAt(0) === Math.min(...(word.split('').map(c => c.charCodeAt(0))));
      case "last" :
        return word[i].charCodeAt(0) === Math.max(...(word.split('').map(c => c.charCodeAt(0))));
      case "previous-copy" :
        return word[i] === word[i-1];
      case "previous-subsequent" :
        return word[i] === shiftLetter(word[i-1], 1);
      case "previous-antecedent" :
        return word[i] === shiftLetter(word[i-1], -1);
      case "next-copy" :
        return word[i] === word[i+1];
      case "next-subsequent" :
        return word[i] === shiftLetter(word[i+1], 1);
      case "next-antecedent" :
        return word[i] === shiftLetter(word[i+1], -1);
    }
    return true;
  })
  
  return out;
}

function shiftLetter(letter :string, offset = 1) {
  if (!letter) return
  const outCharCode = (((letter.charCodeAt(0) + offset -97) +26) %26) +97;
  return String.fromCharCode(outCharCode);
}
 
function cleanInputWord(s :string) {
  let out_s = "";
  const acceptable_chars = "abcdefghijklmnopqrstuvwxyz";
  for (let c of s?.toLowerCase()) {
    if (!acceptable_chars.includes(c)) continue;
    out_s += c;
  }
  return out_s
}