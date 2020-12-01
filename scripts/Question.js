class Question{
    constructor( currrentQuestion ){
        this.currrentQuestion = currrentQuestion; 
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
        questionWrapper.appendChild(questionText); 
        questionWrapper.appendChild(average); 
        //
        questionText.innerHTML = this.currrentQuestion.text;
        average.innerHTML = this.currrentQuestion.average; 

        return questionWrapper; 
    }
}