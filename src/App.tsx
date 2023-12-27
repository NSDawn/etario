import { useState } from 'react';
import ConditionCard from './components/ConditionCard';
import './App.css';
import $_constraints from "./assets/strings/constraints.json";
const $constraints :Record<string, {symbol: string, desc: string}> = $_constraints;
import _acceptableWords from './assets/wordlist-stuff/acceptable-words.json' ;
const acceptableWords :Record<number, string[]> = _acceptableWords;
import {satisfiesConstraints, shiftLetter, cleanInputWord} from "./assets/ref/Game"
import _prompts from "./assets/ref/prompts.json"
const prompts :Record<number, Record<number, string[][]>> = _prompts;

function App() {
  const [word, setWord] = useState('');
  const [inputWord, setInputWord] = useState('');
  const [constraints, setConstraints] = useState([
    'any', 
    'any',
    'any',
    'any',
  ]);

  
  const _inputWord = cleanInputWord(inputWord);
  if (_inputWord !== inputWord) setInputWord(_inputWord);

  const satisfiedConds = satisfiesConstraints(inputWord, constraints);
  
  const isCompleteInput = inputWord.length === constraints.length;
  const isInvalidInput = (!acceptableWords[inputWord.length]?.includes(inputWord));

  const isAcceptableInput = (
    isCompleteInput && 
    !isInvalidInput &&
    !satisfiedConds.some(v => !v)
  );
  
  const [inputBoxAnimationClass, setInputBoxAnimationClass] = useState('')
  const animateInputBox = (animation :string, delay_ms :number) => {setInputBoxAnimationClass(animation); setTimeout(() => setInputBoxAnimationClass(''), delay_ms);}

  function handleEnterKeyPress(e: React.KeyboardEvent) {
    if (!isAcceptableInput) {
      animateInputBox('anim-incorrect', 200)
      return;
    };
    animateInputBox('anim-correct', 200);
    setTimeout(doNextPrompt, 200);
  }

  function doNextPrompt() {
    setInputWord("");
    const possiblePrompts = prompts[4][1]
    const randIdx = Math.floor(possiblePrompts.length * Math.random())
    setConstraints(possiblePrompts[randIdx])
  }


  return (
    <>
      <header>
        <h1>etario</h1>
        <h2>a constraint-based word game</h2>
      </header>
      <main>
        <section className='constraints'>
          {
            constraints.map((constraint, i) => {
              return (
                <ConditionCard 
                  satisfication_state={(satisfiedConds[i] === null) ? "blank" : satisfiedConds[i] ? "satisfied" : "unsatisfied" }
                  display_symbol={$constraints[constraint]?.symbol ?? "displaySymbolMissing"} 
                  display_text={$constraints[constraint]?.desc ?? "displayDescMissing"}
                  key={i} 
                />
                
              )
            })
          }
        </section>
        <section className="user-input">
          <input 
            type="text"
            className={`${isCompleteInput && isInvalidInput? "invalid-input" : ""} ${inputBoxAnimationClass}`}
            maxLength={constraints.length}
            spellCheck={false}
            value={inputWord}
            onChange={e => setInputWord(e.target.value)}
            onKeyDown={e => {if (e.key === "Enter") handleEnterKeyPress(e);}}
          />
          {
            isCompleteInput && isInvalidInput && inputWord[inputWord.length -1] === 's' ?
            <div className="no-plurals">no plurals!</div>
            :null
          }
          
        </section>
      </main>
    </>
  )
}

export default App;
