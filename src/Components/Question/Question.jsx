import React from 'react'
import { nanoid } from 'nanoid'
import Option from '../Option/Option'
import './Question.css'
export default function Questions({setData,Setnewgame,data}){  
    
      const Data  = data // 10 queston and option
      const[submit , SetSubmit]= React.useState(false) 
      const[qna,Setqna] = React.useState(getRandomArray(Data)) // for mapping the option and placing the right option at random and known position 
      const[key,Setkey] = React.useState(qna) // this contains the answer key of the quiz 
      const[toMatch,SetMatch] = React.useState(Array(10).fill(-1))// contains the option selected by the user 
      const[score,Setscore] = React.useState(0) // initial score
      const[SubmitAttempt,SetsubmitAttempt] = React.useState(false)

        function getOptions(nums, index){
                let optionarray =[]
                let k = 0;
                for(let i = 0 ; i<4; i++){
                    if(i==nums){
                        optionarray.push(Data[index].correct_answer)
                    }else{
                        optionarray.push(Data[index].incorrect_answers[k++])
                    } 
                }
               return optionarray.map((num,optIndex)=>{   
                return(   
                    <Option 
                    key = {nanoid()}
                    rightoption = {key[index]===optIndex}
                    choice = {num}
                    optIndex = {optIndex}
                    index = {index}
                    handleoption = {handleoption}
                    submit ={submit}
                    toMatch = {toMatch}
                    className="option-container"
                    empty = {num==undefined}
                     /** 
                         * 'empty' is used for returning empty jsx if nothing is there
                     */ 
                    />
                    ) 
                    }
                )
            }
        function handleSubmit(e){
            e.preventDefault()
            //check if all the options are selected
            if(!toMatch.includes(-1)&& submit==false){  
            let score = 0 ; 
            for(let i = 0 ; i<key.length;i++){
            if(key[i]==toMatch[i]){
                ++score;
            }
            }
            Setscore(score)
            SetSubmit(true)
            Setqna(getRandomArray(Data))
            Setkey(qna)
            SetsubmitAttempt(false)
            
            }else {
                SetsubmitAttempt(true)
                
            }            
        }
        function handleoption(e){
            let newTomMatch = toMatch
            const optionSelected = parseInt( e.target.value)    //option selected for that question 
            const indextoMatch = parseInt(e.target.name)   //question number 
            for(let i =0 ;i<toMatch.length ; i++){
                if(i==indextoMatch){
                    newTomMatch[i]=optionSelected
                }
            }
            SetMatch(newTomMatch)
        }
        function handleNewGame(){  
            SetMatch(Array(10).fill(-1))
            setData(null)
            SetSubmit(false)
            Setnewgame((prev)=>!prev)
            Setscore(0)
        }
        function getRandomArray(Data){ 
            let array = []  
            for(let i = 0 ; i<10  ;i++){
                // bug due to type boolean and multiple is fixed 
                if(Data[i].type=='boolean')
                    array.push(Math.floor(Math.random()*2))
                else
                array.push(Math.floor(Math.random()*4))
            }
            return array
          }
          const QNA = qna.map((nums,index)=>{
            let quest = Data[index].question
            return (
                <div key = {nanoid()} className='Container'>
                    <div className='Question-container'>
                        <p className='Question'>{index+1}. {quest}</p>
                    </div>
                    <div className='Options'>
                        {getOptions(nums,index)}
                    </div>
                </div>
            )
            })
    return (
        <form  onSubmit={handleSubmit} noValidate>
            <div  className='qna'>
                {QNA} 
                {SubmitAttempt && <p className='warning'>Please Select all Options</p>}
                { submit && 
                <p>
                    Your final Score is {score}
                </p>
                }
            <div className='button-container'>
                <button className='btn' type ='submit' >
                    Submit
                </button>

                {submit && 
                <button  className='btn'  onClick={handleNewGame}>
                    New Game
                </button>
                }
                </div>
                
            </div>
        </form>
    )
    }
  
    