import React from "react";
import {decode} from 'html-entities';
import {nanoid} from 'nanoid'
import './option.css'
export default function Option({index,optIndex,handleoption,submit,choice,rightoption,toMatch,empty}){
    
    return (
      empty ? 
      <></> 
      :
          <label className="label" 
          key = {nanoid()}  
          htmlFor  = {`q${index}o${optIndex}`} 
          >
                <input type='radio'
                 id={`q${index}o${optIndex}`}
                 name ={index} 
                 value={optIndex} 
                 onChange={handleoption}   
                 disabled={submit}
                 className="radio-input"
                 onInvalid={F => F.target.setCustomValidity('SHI SE KHEL BHAI')} 
                 onInput={F => F.target.setCustomValidity('')} 
                 required
                 />
                 <div id="onewe" className ={submit && rightoption ? "r-option" :  toMatch[index]===optIndex && submit ? "w-option" : "select" } 
                 //   style = {{backgroundColor : submit &&rightoption ? "green" : toMatch[index]===optIndex ? "red" :  ""}} 
              >
                 <p className="choice">{decode(choice)}</p>
                 </div>
          </label> 
    )
}
/**
 *  possible solution for the red color is to add a variable wrong-option to the checked options 
 * 
 */