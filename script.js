class Calculator{
    constructor(previousOperandText,curremtOperandText  ){
        this.previousOperandText = previousOperandText;
        this.curremtOperandText  = curremtOperandText;
        this.clear();
    }

    clear(){
        this.curremtOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    delete(){
        this.curremtOperand = this.curremtOperand.toString().slice(0,-1)
    }

    appendNumber(number){
        if(number ==="." && this.curremtOperand.includes('.')) return
        this.curremtOperand = this.curremtOperand.toString() + number.toString();
    }

    chooseOperation(operation){
        if(this.curremtOperand === "") return;
        if(this.previousOperand !==""){
            this.compute()
        }
        this.operation = operation;
        this.previousOperand = this.curremtOperand;
        this.curremtOperand = ""
    }

    compute(){
        let computation;
        let prev = parseFloat(this.previousOperand);
        let curr = parseFloat(this.curremtOperand); 

        if(isNaN(prev) || isNaN(curr)) return;
        switch(this.operation){
            case '+':
                computation = prev + curr;
                break;

            case '-':
                computation = prev - curr;
                break;

            case '*':
            computation = prev * curr;
            break;

            case '÷':
                computation = prev / curr;
                break;
            default:
                return;
        }
        this.curremtOperand = computation;
        this.operation =undefined;
        this.previousOperand =''
    }

    getDsiplayNumber(number){
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay ;
        if(isNaN(integerDigits)){
            integerDisplay = ''
        }else{
            integerDisplay = integerDigits.toLocaleString('en',{maximumFractionDigits: 0})
        }
        if(decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`
        }else{
            return integerDisplay;
        }
    }

    updateDisplay(){
        this.curremtOperandText.innerText = this.getDsiplayNumber(this.curremtOperand);
        if(this.operation != null){
            this.previousOperandText.innerText = 
            `${this.getDsiplayNumber(this.previousOperand)} ${this.operation}`
        }else{
            this.previousOperandText.innerText = ''
        }
    }
}



const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');

const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandText = document.querySelector('[data-previous-operand]')
const curremtOperandText = document.querySelector('[data-current-operand]')


const calculator = new Calculator(previousOperandText , curremtOperandText)


numberButtons.forEach(button =>{
    button.addEventListener('click' , ()=>{
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operationButtons.forEach(button =>{
    button.addEventListener('click' , ()=>{
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

equalsButton.addEventListener('click',(button) =>{
    calculator.compute();
    calculator.updateDisplay();
})

allClearButton.addEventListener('click',(button) =>{
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click',(button) =>{
    calculator.delete();
    calculator.updateDisplay();
})