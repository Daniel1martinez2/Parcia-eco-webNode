class Question{
    constructor( currrentQuestion ){
        this.currrentQuestion = currrentQuestion; 
        const database = firebase.database(); 
    }
    //id
    //estado
    //promedio
    //texto
    render = ()=>{
        const questionWrapper = document.createElement('div'); 
        questionWrapper.classList.add('question'); 
        const questionText = document.createElement('h4'); 
        const average = document.createElement('h5'); 
        const deleteBtn = document.createElement('button'); 
        deleteBtn.classList.add('delete-btn-his'); 
        deleteBtn.innerHTML = 'X'; 

        
        
        
        const questionAndBtn = document.createElement('div'); 
        questionAndBtn.classList.add('question-btn'); 
        questionAndBtn.appendChild(questionText); 
        questionAndBtn.appendChild(deleteBtn); 
        questionWrapper.appendChild(questionAndBtn); 
        questionWrapper.appendChild(average); 
        //
        questionText.innerHTML = this.currrentQuestion.text;
        average.innerHTML = this.currrentQuestion.average; 
        deleteBtn.addEventListener('click', ()=>{
            database.ref('answers/'+this.currrentQuestion.id).set(null); 
            database.ref('questions/'+this.currrentQuestion.id).set(null); 
        }); 

        return questionWrapper; 
    }
}