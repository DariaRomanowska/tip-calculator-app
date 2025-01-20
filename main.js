const bill = document.getElementById('bill');
const person = document.getElementById('person');
const tipBtns = document.querySelectorAll('.btn-tip')
const tipText = document.querySelector('#tip-amount');
const totalText = document.querySelector('#total');
const resetBtn = document.querySelector('#reset');
let billAmount = 0;
let personAmount = 0;
let tipAmount = 0;
let tipPerPerson = 0;
let totalPerPerson = 0;

const customTipBtn = document.getElementById('custom');

function calculateTip(bill, tip, person) {
    if(person > 0){
        tipPerPerson = ((bill * tip) / 100) / person;
        tipText.textContent = `${parseFloat(tipPerPerson.toFixed(2))}`;
        return tipPerPerson
    } else {
        console.log('persons must be more than 0')
    }
}

function calculateTotal(bill, tip, person) {
    if(person > 0){
        totalPerPerson = (bill / person) + tipPerPerson;
        totalText.textContent = `${parseFloat(totalPerPerson.toFixed(2))}`;
    } else {
        console.log('persons must be more than 0')
    }

}


function getReset () {
    resetBtn.classList.add('active-reset');
    resetBtn.addEventListener('click', () => {
        resetBtn.classList.remove('active-reset');
        tipBtns.forEach((btn) => {
            btn.classList.remove('active-btn')
        })
        tipText.textContent = '0.00'
        totalText.textContent = '0.00'
        billAmount = 0;
        personAmount = 0;
        tipAmount = 0;
        document.querySelector('form').reset();
    })
}
function getAmount() {
    tipBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            tipBtns.forEach((btn) => {
                btn.classList.remove('active-btn')
            })
            btn.classList.add('active-btn')
            tipAmount = btn.getAttribute('data-value');
            if (billAmount === 0 || personAmount === 0) {
                tipText.textContent = '0.00';
                totalText.textContent = '0.00';
            } else {
                calculateTip(billAmount, tipAmount, personAmount);
                calculateTotal(billAmount, tipPerPerson, personAmount);
                getReset()
                // tipText.textContent = `${(((billAmount * tipAmount) / 100) / personAmount)}`
            }
        })
    })

    customTipBtn.addEventListener('blur', () => {
        tipAmount = customTipBtn.value
        if (billAmount === 0 || personAmount === 0) {
            tipText.textContent = '0.00'
            totalText.textContent = '0.00'
        } else {
            // tipText.textContent = `${((billAmount * tipAmount)/100)/personAmount}`
            calculateTip(billAmount, tipAmount, personAmount);
            calculateTotal(billAmount, tipPerPerson, personAmount);
            getReset()
        }
    })

    bill.addEventListener('blur', (e) => {
        e.preventDefault()
        bill.setAttribute('data-value', `${bill.value}`)
        billAmount = bill.getAttribute('data-value')
        if (tipAmount === 0 || personAmount === 0) {
            tipText.textContent = '0.00';
            totalText.textContent = '0.00';
        } else {
            // tipText.textContent = `${((billAmount * tipAmount)/100)/personAmount}`
            calculateTip(billAmount, tipAmount, personAmount);
            calculateTotal(billAmount, tipPerPerson, personAmount);
            getReset()
        }
    })

    person.addEventListener('blur', () => {
        person.setAttribute('data-value', `${person.value}`)
        personAmount = person.getAttribute('data-value')
        if (tipAmount === 0 || billAmount === 0) {
            tipText.textContent = '0.00';
            totalText.textContent = '0.00';
        } else {
            // tipText.textContent = `${((billAmount * tipAmount)/100)/personAmount}`
            calculateTip(billAmount, tipAmount, personAmount);
            calculateTotal(billAmount, tipPerPerson, personAmount);
            getReset()
        }
    })
}

getAmount()


