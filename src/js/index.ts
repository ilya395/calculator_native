import '../sass/style.scss';
import { Calculator } from './components/Calculator';

const calculator = new Calculator({
    containerDOMUrl: '[data-object="calculator"]'
});
calculator.init();