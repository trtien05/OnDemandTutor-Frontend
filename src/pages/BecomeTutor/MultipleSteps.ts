import {ReactElement} from 'react'
import {useState} from 'react';
export default function MultipleSteps(steps: ReactElement[]) {
    const [current, setCurrent] = useState(0);
    function next(){
        setCurrent(i=>{
          if(i>=steps.length-1) return i; 
          return i+1;
        })
      }
      function back(){
        setCurrent(i=>{
            if(i<=0) return i;
            return i-1;
        })
      }
      function goTo(index:number){
        setCurrent(index);
      }
  return {
    current,
    step: steps[current],
    steps,
    isFirstStep: current ===0,
    isLastStep: current === steps.length - 1,
    goTo,
    next,
    back
    }
}
