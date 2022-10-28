import React,{useState} from 'react'

export default function TextForm(props) {
    const[text,setText] = useState('');
    const[fWord,findWord] = useState('');
    const[rWord,replaceWord] = useState('');

    const handleUpClick = ()=>{  
        let newText = text.toUpperCase();
       setText(newText);
       if(newText.length >0){
            props.showAlert('Converted to UpperCase','success');
       };
       
    };
    const handleloClick = ()=>{  
        let newText = text.toLocaleLowerCase();
       setText(newText);
       if(newText.length >0){
        props.showAlert('Converted to UpperCase','success');
        };
    };
    const handleOnChange = (event)=>{
        setText(event.target.value);
    };
    const handleFindWord = (event)=>{
        findWord(event.target.value);
    };
    const handleReplaceWord = (event)=>{
        replaceWord(event.target.value);
    };
    const handleCopyText = ()=>{
        let text = document.getElementById('myBox');
        text.select();
        navigator.clipboard.writeText(text.value);
        if(text.length >0){
            props.showAlert('text coppied','success');
        };

    };

    const handleExtraSpaces = ()=>{
        let newText = text.split(/[ ]+ /);
        setText(newText.join(''));

    };
    const handleReplaceClick = (event)=>{
        if(text.length >1){
            if(fWord && rWord){
                let newText = text.replaceAll(fWord,rWord);
                setText(newText);
                if(newText.length >0){
                    props.showAlert('word is replaced','success');
               };
            }
            else{
                props.showAlert('Find word or Replace word is required','danger');
            }
        }
        else{
            props.showAlert('enter text to analyze','danger');
        }
    }
    return (
        <>
        <div className='container' style={{color:props.mode === 'dark'? 'white':'#042743'}}>
            <h1 >{props.h1}</h1>
            <div className="mb-3">
            <label htmlFor="myBox" className="form-label"></label>
            <textarea className="form-control" id="myBox" style={{backgroundColor:props.mode === 'dark'? 'gray':'white',color:props.mode === 'dark'? 'white':'#042743'}} onChange={handleOnChange} value = {text} rows="8"></textarea>
            <div className=' row col-md-12 my-2' >
                <input type = 'textbox'className="col-md-4 mx-2" required='true' placeholder='Find' id="findBox" onChange={handleFindWord} value = {fWord} />
                <input type ='textbox'className="col-md-4 mx-2"   required='true'placeholder = 'Replace' id="replaceBox" onChange={handleReplaceWord} value = {rWord} />
            </div>
            <button className="btn btn-primary my-3 mx-1 my-1" onClick={handleUpClick}>Convert To Uppercase</button>
            <button className="btn btn-primary my-3 mx-1 my-1" onClick={handleloClick}>Convert To Lowercase</button>
            <button className="btn btn-primary my-3 mx-1 my-1" onClick={handleCopyText}>Copy Text</button>
            <button className="btn btn-primary my-3 mx-1 my-1" onClick={handleReplaceClick}>Replace</button>
            <button className="btn btn-primary my-3 mx-1 my-1" onClick={handleExtraSpaces}>Remove Extra Space</button>
            </div>
        </div>
        <div className="container my-2" style={{color:props.mode === 'dark'? 'white':'#042743'}}>
            <h2>Your Text summary</h2>
            <p>{text.split(' ').filter((element)=>{return element.length!==0}).length} words and {text.length} character</p>
            <p>{0.008*text.split(' ').length}Minutes read</p>
            <h3>Preview</h3>
            <p>{text.length > 0 ? text : 'Enter something into textbox to preview here'}</p>
        </div>
        </>
    )
}
