import CardValidate from "../validate"
import { JSDOM } from 'jsdom';

const data = [
    [5114142269515435, 'accept', true],
    [5114142269515434, 'not-accept', true],
]

test.each(data)('123321', (value, className, result) => {
    const dom = new JSDOM(`
        <div class="input-block">
            <ul class="bank-cards">
                <li class="amex"></li>
                <li class="discover"></li>
                <li class="jcb"></li>
                <li class="mastercard"></li>
                <li class="mir"></li>
                <li class="visa"></li>
            </ul>
            <form class="input-field">
                <input type="text" class="field">
                <button class="input-button">Click to Validate</button>
            </form>
        </div>`);
        
    global.document = dom.window.document;
    const obj = new CardValidate()
    obj.changeCard()
    document.querySelector('.field').value = value
    document.querySelector('.input-button').click()
    expect(document.querySelector('.field').classList.contains(className)).toEqual(result)
})