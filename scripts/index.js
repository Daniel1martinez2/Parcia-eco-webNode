const database = firebase.database(); 
const questionsContainer = document.querySelector('.history__elems'); 
const questionPrime = document.querySelector('.current-question__question '); 
const averagePrime = document.querySelector('.current-question__average'); 
const questionInput = document.querySelector('.question-input'); 
const sendQuestion = document.querySelector('.send'); 
const deleteBtn = document.querySelector('.delete'); 
let idQuestionCurrent; 

sendQuestion.addEventListener('click', ()=>{
    if(questionInput.value.trim() != ''){ 
        database.ref('questions').once('value',(data)=>{
            data.forEach(element => {          
                database.ref('questions/'+element.val().id).update({
                    state: false
                });
            });
            let reference = database.ref('questions').push(); 
            let question = {
                id: reference.key, 
                text: questionInput.value, 
                average: 0, 
                state: true
            }
            reference.set(question); 
        }); 
        questionInput.value = ''; 
    }
}); 


//methods
//modify real time
//in the first part i bring back all the data, because, i want in a single movemment set the current question and the history ones
database.ref('questions').on('value',(data)=>{
    questionsContainer.innerHTML = ''; 
    questionPrime.innerHTML = ''; 
        data.forEach((element)=> {
            if(element ==null){
                questionPrime.innerHTML = ''; 
            }else{
                if(element.val().state){
                    questionPrime.innerHTML = element.val().text; 
                    idQuestionCurrent = element.val().id; 
                    deleteBtn.addEventListener('click', ()=>{
                        database.ref('answers/'+idQuestionCurrent).set(null); 
                        database.ref('questions/'+idQuestionCurrent).set(null); 
                    }); 
                    database.ref('answers/'+element.val().id).orderByChild('idQuestion').equalTo(element.val().id).on('value',(data2)=>{
                       if(data2.val()!=null){
                           let averageCal = 0; 
                           let index = 0; 
                           data2.forEach((element2)=>{
                               index ++;
                               averageCal +=  element2.val().response; 
                           }); 
                           let currentAverage = Math.floor(averageCal/index);
                           averagePrime.innerHTML = currentAverage; 
                           database.ref('questions/'+element.val().id).update({
                               average: currentAverage
                           }); 
                       }else{
                        averagePrime.innerHTML = 0; 
                       }
                    }); 
                }else{
                    //this is my history
                    let questions = new Question(element.val());
                    questionsContainer.insertBefore(questions.render(),questionsContainer.firstChild);
                }
            }
    });
}); 
