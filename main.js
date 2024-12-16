const bill = document.getElementById('bill');
const person = document.getElementById('person');
const tipBtns = document.querySelectorAll('.btn-tip')
const tipText = document.querySelector('#tip-amount');
const totalText = document.querySelector('#total');
let billAmount = 0;
let personAmount = 0;
let tipAmount = 0;
let tipPerPerson = 0;
let totalPerPerson = 0;

const customTipBtn = document.getElementById('custom');

function calculateTip(bill, tip, person) {
    tipPerPerson = ((bill * tip) / 100) / person;
    tipText.textContent = `${parseFloat(tipPerPerson.toFixed(2))}`;
    return tipPerPerson
}

function calculateTotal(bill, tip, person) {
    totalPerPerson = (bill / person) + tipPerPerson;
    totalText.textContent = `${parseFloat(totalPerPerson.toFixed(2))}`;
}

function getAmount() {
    tipBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            btn.classList.add('active-btn')
            tipAmount = btn.getAttribute('data-value');
            if (billAmount === 0 || personAmount === 0) {
                tipText.textContent = '0.00'
            } else {
                calculateTip(billAmount, tipAmount, personAmount);
                calculateTotal(billAmount, tipPerPerson, personAmount);
                // tipText.textContent = `${(((billAmount * tipAmount) / 100) / personAmount)}`
            }
        })
    })

    customTipBtn.addEventListener('blur', () => {
        tipAmount = customTipBtn.value
        if (billAmount === 0 || personAmount === 0) {
            tipText.textContent = '0.00'
        } else {
            // tipText.textContent = `${((billAmount * tipAmount)/100)/personAmount}`
            calculateTip(billAmount, tipAmount, personAmount);
            calculateTotal(billAmount, tipPerPerson, personAmount);
        }
    })

    bill.addEventListener('blur', (e) => {
        e.preventDefault()
        bill.setAttribute('data-value', `${bill.value}`)
        billAmount = bill.getAttribute('data-value')
        if (tipAmount === 0 || personAmount === 0) {
            tipText.textContent = '0.00'
        } else {
            // tipText.textContent = `${((billAmount * tipAmount)/100)/personAmount}`
            calculateTip(billAmount, tipAmount, personAmount);
            calculateTotal(billAmount, tipPerPerson, personAmount);
        }
    })

    person.addEventListener('blur', () => {
        person.setAttribute('data-value', `${person.value}`)
        personAmount = person.getAttribute('data-value')
        if (tipAmount === 0 || billAmount === 0) {
            tipText.textContent = '0.00'
        } else {
            // tipText.textContent = `${((billAmount * tipAmount)/100)/personAmount}`
            calculateTip(billAmount, tipAmount, personAmount);
            calculateTotal(billAmount, tipPerPerson, personAmount);
        }
    })
}

getAmount()
