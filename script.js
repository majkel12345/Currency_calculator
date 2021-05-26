const input = document.querySelector(".input");
const selectFirst = document.querySelector(".select__from");
const selectSecond = document.querySelector(".select__convert");
const output = document.querySelector(".result")
const API_KEY = "a1e96406548584d60eae8427f139669f"

output.value = 1

class CurrencyCalculator {

    dataFetched() {
        fetch("http://api.exchangeratesapi.io/v1/latest?access_key=a1e96406548584d60eae8427f139669f")
        .then((response) => response.json())
        .then((data) => {
            const rates = data.rates
            const dataKeys = Object.keys(rates)
            this.createOptionElement(dataKeys, selectFirst);
            this.createOptionElement(dataKeys, selectSecond)
            output.innerText = `Result : ${output.value} ${selectSecond.value}`
            input.addEventListener('keyup', (e) => this.calculation(e, rates))
            selectFirst.addEventListener('change', (e) => this.calculation(e, rates))
            selectSecond.addEventListener('change', (e) => this.calculation(e, rates))
        })
        .catch(() => {
            console.error('Nie udało sie pobrać danych')
        })
    }

    
    createOptionElement(dataKeys, el) {
        dataKeys.map((key) => {
        const option = document.createElement('option')
        option.innerHTML = key;
        el.appendChild(option)
        })
    }

    calculation(e, rates){
        e.preventDefault();
        if (input.value > 0) {    
            output.value = Math.round(input.value * rates[selectSecond.value] / rates[selectFirst.value] * 1000) / 1000
            output.innerText = `Result : ${output.value} ${selectSecond.value}`
        } else {
            output.innerText = `Result : 0 ${selectSecond.value}`
        }
        
    }

    
}

const calc = new CurrencyCalculator();
calc.dataFetched()

