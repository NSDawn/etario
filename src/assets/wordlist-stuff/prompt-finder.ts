export function satisfiesConstraints(word: string, constraints: string[]): (boolean|null)[] {
    let out = constraints.map((v, i) => {
      if (!word[i]) return null;
      if (v.startsWith("is-")) {
        return v[3] === word[i];
      }
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
    
  export function shiftLetter(letter :string, offset = 1) {
    if (!letter) return;
    const outCharCode = (((letter.charCodeAt(0) + offset -97) +26) %26) +97;
    return String.fromCharCode(outCharCode);
  }
     
  export function cleanInputWord(s :string) {
    let out_s = "";
    const acceptable_chars = "abcdefghijklmnopqrstuvwxyz";
    for (let c of s?.toLowerCase()) {
      if (!acceptable_chars.includes(c)) continue;
      out_s += c;
    }
    return out_s
  }
  
  function returnRandom(...args: any) {
    return args[Math.floor(Math.random() * args.length)]
  }


/*
let randPrompt :string[] = [
    returnRandom("any", "any", "any-norepeats", "any-norepeats", "next-subsequent", "next-antecedent", "etario", "kjvxzq"),
    returnRandom("any", "any", "etario", "kjvxzq"),
    returnRandom("any-norepeats", "next-subsequent", "next-antecedent", "next-copy", "previous-copy", "previous-antecedent", "previous-copy"),
    returnRandom("any", "any", "etario", "kjvxzq"),
];
randPrompt[Math.floor(Math.random() * randPrompt.length)] = returnRandom("any", "any", "first", "last");
console.log(randPrompt)
*/
import _words from "./acceptable-words.json";
const words :Record<number, string[]> = _words;
const randPrompt = [ "etario", "first", "kjvxzq" ]

let sols :string[] = []
for (let word of words[randPrompt.length]) {
    if (!satisfiesConstraints(word, randPrompt).some((v) => !v)) {
        sols.push(word);
    }
}
console.log(sols.length);
console.log(sols);
