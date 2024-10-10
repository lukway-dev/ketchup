import {
    MDCTextField,
    MDCTextFieldCharacterCounter,
    MDCTextFieldHelperText,
    MDCTextFieldIcon,
} from '@material/textfield';
import { MDCFormField } from '@material/form-field';

/**
 * Instantiates Material Design text field component.
 * @param el - Must be the f-component wrapper (.f-text-field)
 * @see https://material-components.github.io/material-components-web-catalog/#/component/text-field
 */
export function FTextFieldMDC(el: HTMLElement): void {
    const component = new MDCTextField(el.querySelector('.mdc-text-field'));
    const form: HTMLElement = el.querySelector('.mdc-form-field');
    const input: HTMLInputElement = el.querySelector('.mdc-text-field__input');
    const helper: HTMLElement = el.querySelector('.mdc-text-field-helper-text');
    const counter: HTMLElement = el.querySelector(
        '.mdc-text-field-character-counter'
    );
    const icon: HTMLElement = el.querySelector('.mdc-text-field-icon');

    if (form) {
        const formField = MDCFormField.attachTo(form);
        if (formField) {
            formField.input = component;
        }
    }
    if (helper) {
        new MDCTextFieldHelperText(helper);
    }
    if (counter) {
        input.addEventListener('input', () => {
            const valueLength = input.value.length;
            counter.textContent = `${valueLength} / ${input.maxLength}`;
        });
    }
    if (icon) {
        new MDCTextFieldIcon(icon);
    }
}
