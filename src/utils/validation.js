import { FormValidator } from '../components/FormValidator.js';

const formValidators = {};

const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => {
        const validator = new FormValidator(config, formElement);
        validator.enableValidation();
        const formName = formElement.getAttribute('name');
        formValidators[formName] = validator;
    });
};

export { formValidators, enableValidation };