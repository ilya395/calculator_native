interface Obj {
    containerDOMUrl: string,
}

class Calculator {
    container: string;
    result: number | null;
    operation: string | null;
    value: number | null;
    lengthOfDisplay: number;

    constructor(object: Obj) {
        this.container = object.containerDOMUrl;
        this.result = null;
        this.operation = null;
        this.value = null;
        this.lengthOfDisplay = 7;
    }

    _render(val: number = 0) {
        // const container: HTMLElement | null = document.querySelector(this.container).querySelector('[data-object="display"]');
        const display: HTMLElement | null = document.querySelector('[data-object="display"]')
        if (display) {
            display.innerText = String(val);
        }
    }

    _calculate() {
        if (this.operation != null && this.result != null) {
            switch (this.operation) {
                case '/':
                    if (this.result && this.value) {
                        this.result = this.result / this.value;
                    }
                    break;

                case '*':
                    if (this.result && this.value) {
                        this.result = this.result * this.value;
                    }
                    break;

                case '+':
                    if (this.result && this.value) {
                        this.result = this.result + this.value;
                    }
                    break;

                case '-':
                    if (this.result && this.value) {
                        this.result = this.result - this.value;
                    }
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
        const target: HTMLElement | null = document.querySelector(this.container);
        if (target) {
            target.addEventListener('click', (event) => {
                const selectedElement: HTMLElement = (<HTMLElement> event.target);
                switch (selectedElement.dataset.object) {
                    case 'number':
                        if (this.value === null || String(this.value).length <= this.lengthOfDisplay) {
                            if (selectedElement.dataset.number) {
                                this.value = this.value === null ? this.value = +selectedElement.dataset.number : +(String(this.value) + selectedElement.dataset.number);
                                this._render(this.value);
                            }
                        }
                        break;
    
                    case 'option':
                        if (selectedElement.dataset.option == '%') {
                            alert('Камон, еще и проценты считать?!');
                        }
                        if (selectedElement.dataset.option == 'c') {
                            this.value = null;
                            this._render(0);
                        }
                        if (selectedElement.dataset.option == 'ca') {
                            this.value = null;
                            this.result = null;
                            this._render(0);
                        }
                        if (selectedElement.dataset.option == '+/-') {
                            if (this.value) {
                                this.value = this.value * (-1);
                                this._render(this.value);
                            }
                        }
                        break;
    
                    case 'operation':
                        if (this.result == null) {
                            this.result = this.value;
                            this.value = null;
                        }
                        if (this.operation == null || this.value == null) {
                            if (selectedElement.dataset.operation) {
                                this.operation = selectedElement.dataset.operation;
                            }
                        } 
                        if (this.result && this.operation && this.value) {
                            this._calculate();
                            if (selectedElement.dataset.operation) {
                                this.operation = selectedElement.dataset.operation;
                            }
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
}

export { Calculator }