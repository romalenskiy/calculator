const inputField = document.querySelector('.input-field')
const numField = document.querySelector('.num-field')
const contentOutputs = document.querySelectorAll('.content-output')
const outputPrimary = document.querySelector('input')
const outputSecondary = document.querySelector('.output-secondary input')
const equallyButton = document.querySelector('#equally')
const deleteButton = document.querySelector('#delete')

const operandsRegExp = /[\d\.]/
const operatorsRegExp = /[\+\-\*\/]/

let exp = ""
let globalIndex = 0
let operands = []
let operators = []

// Event listeners
contentOutputs.forEach(function(contentOutput) {
    contentOutput.addEventListener('click', inputFromScreen)
})
equallyButton.addEventListener('click', answerToOutputPrimary)
deleteButton.addEventListener('click', allClear)
document.addEventListener('keydown', keyActions)
outputPrimary.addEventListener('input', inputProcessing) // for directly input from keyboard

// Main functions

function inputFromScreen(event) {
    outputPrimary.value += event.target.textContent
    inputProcessing()
}

function inputProcessing() {
    outputPrimary.focus()
    updateExp() 
    parsingExp()
    outputAnswer(calculateAnswer())
}

function updateExp() {
    exp = outputPrimary.value
}

function parsingExp() {
        let expLast = exp[exp.length - 1]  
    
        if (operandsRegExp.test(expLast)) {
            if (operands[globalIndex] === undefined) {operands[globalIndex] = ''}
            operands[globalIndex] += expLast
            console.log(operands)
        } else if (operatorsRegExp.test(expLast)) {
            operators[globalIndex] = expLast
            console.log(operators)
            globalIndex++
        }
}

function outputAnswer(answer) {
    if (!(Number.isNaN(answer))) {
        outputSecondary.value = answer
    }
}

function calculateAnswer() {
    let answer
    let operationResult
    let operandsClone = operands.slice()
    let operatorsClone = operators.slice()
    const operatorTypes = ['*', '/', '+', '-']

    operatorTypes.forEach(function(operator) {
        while (operatorsClone.findIndex(findHelper) !== -1) {
            let index = operatorsClone.findIndex(findHelper)
            let firstOperand = parseFloat(operandsClone[index])
            let secondOperand = parseFloat(operandsClone[index+1])
            switch(operator) {
                case '*': 
                    operationResult = firstOperand * secondOperand
                    break
                case '/': 
                    operationResult = firstOperand / secondOperand
                    break
                case '+': 
                    operationResult = firstOperand + secondOperand
                    break
                case '-': 
                    operationResult = firstOperand - secondOperand
                    break
            }    
            operandsClone.splice(index + 1, 1, operationResult)
            operandsClone.splice(index, 1)
            operatorsClone.splice(index, 1) 
        }

        function findHelper(el) {return el === operator}
    })

    answer = operandsClone[0]
    return answer
}

function answerToOutputPrimary() {
    if (!operatorsRegExp.test(outputPrimary.value)) {outputPrimary.focus(); return}
    clear()
    outputPrimary.value = operands[0] = outputSecondary.value
}

function keyActions(e) {
    switch(e.key) {
        case 'Enter': 
            answerToOutputPrimary()
            break
        case 'Backspace':
            allClear()
            break
        
    }
}

function allClear() {
    exp = ""
    globalIndex = 0
    operands = []
    operators = []
    outputPrimary.value = ''
    outputSecondary.value = ''
    outputPrimary.focus()
}

function clear() {
    exp = ""
    globalIndex = 0
    operands = []
    operators = []
    outputPrimary.focus()
}