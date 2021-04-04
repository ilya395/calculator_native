class Calculator {
    constructor(object) {
        this.container = object.containerDOMUrl;
        this.result = null;
        this.operation = null;
        this.value = null;
        this.lengthOfDisplay = 7;
    }

    _render(val) {
        const display = document.querySelector(this.container).querySelector('[data-object="display"]');
        display.innerText = val;
    }

    _calculate() {
        if (this.operation != null && this.result != null) {
            switch (this.operation) {
                case '/':
                    this.result = this.result / this.value;
                    break;

                case '*':
                    this.result = this.result * this.value;
                    break;

                case '+':
                    this.result = this.result + this.value;
                    break;

                case '-':
                    this.result = this.result - this.value;
                    break    
            
                default:
                    break;
            }
            this.operation = null;
            this._render(this.result);
        } else {
            console.log('что-то пошло не так ...');
        }
    }

    init() {
        const target = document.querySelector(this.container);
        target.addEventListener('click', (event) => {
            switch (event.target.dataset.object) {
                case 'number':
                    if (this.value == null || String(this.value).length <= this.lengthOfDisplay) {
                        this.value = this.value == null ? this.value = +event.target.dataset.number : +(String(this.value) + event.target.dataset.number);
                        this._render(this.value);
                    }
                    break;

                case 'option':
                    if (event.target.dataset.option == '%') {
                        alert('Камон, еще и проценты считать?!');
                    }
                    if (event.target.dataset.option == 'c') {
                        this.value = null;
                        this._render(0);
                    }
                    if (event.target.dataset.option == 'ca') {
                        this.value = null;
                        this.result = null;
                        this._render(0);
                    }
                    if (event.target.dataset.option == '+/-') {
                        this.value = this.value * (-1);
                        this._render(this.value);
                    }
                    break;

                case 'operation':
                    if (this.result == null) {
                        this.result = this.value;
                        this.value = null;
                    }
                    if (this.operation == null || this.value == null) {
                        this.operation = event.target.dataset.operation;
                    } 
                    if (this.result && this.operation && this.value) {
                        this._calculate();
                        this.operation = event.target.dataset.operation;
                        this.value = null;
                    }
                    break;
            
                default:
                    console.log('не понятно, куда кликнул :(')
                    break;
            }
        });
    }
}

export { Calculator }