const input = document.querySelector(".input");
const selectFirst = document.querySelector(".select__from");
const selectSecond = document.querySelector(".select__convert");
const output = document.querySelector(".result")
const API_KEY = "a1e96406548584d60eae8427f139669f"


class CurrencyCalculator {

    createOptionElement(data, el) {
        data.map((key) => {
        const option = document.createElement('option')
        option.innerHTML = key;
        el.appendChild(option);
        })
    }

    calculation(rates){
        if (input.value > 0) {    
            output.value = Math.round(input.value * rates[selectSecond.value] / rates[selectFirst.value] * 1000) / 1000
            output.innerText = `Result : ${output.value} ${selectSecond.value}`
        } else {
            output.innerText = `Result : 0 ${selectSecond.value}`
        }
        
    }

    dataFetched() {
        fetch("http://api.exchangeratesapi.io/v1/latest?access_key=a1e96406548584d60eae8427f139669f")
        .then((response) => response.json())
        .then((data) => {
            const rates = data.rates
            const dataKeys = Object.keys(rates)
            this.createOptionElement(dataKeys, selectFirst);
            this.createOptionElement(dataKeys, selectSecond)
            output.innerText = `Result : ${output.value ? output.value : input.value} ${selectSecond.value}`
            input.addEventListener('keyup', () => this.calculation(rates))
            selectFirst.addEventListener('change', () => this.calculation(rates))
            selectSecond.addEventListener('change', () => this.calculation(rates))
            
        })
        .catch(() => {
            console.error('Nie udało sie pobrać danych')
        })
    }

    init() {
        this.dataFetched()
    }
}

const calc = new CurrencyCalculator();
calc.init()


