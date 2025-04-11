const defaultLabels = {
    customError: "Enter a valid value.",
    valueMissing: "Complete this field."
};

const constraintsPriority = [
    'customError', 
     'valueMissing'
];

function resolveBestMatch(validity) {
    if (validity && !validity.valid) {
        return constraintsPriority.find((key) => validity[key]) || 'customError';
    }
    return null;
}

function computeConstraint(provider, key) {
    const val = provider[key];
    return typeof val === 'function' ? val() : !!val;
}

function createValidity(constraints) {
    return {
        get valueMissing() { return computeConstraint(constraints, 'valueMissing'); },
        get customError() { return computeConstraint(constraints, 'customError'); },
        get valid() {
            return !(
                this.valueMissing 
                || this.customError
            );
        }
    };
}

export function getErrorMessage(validity, labelMap = {}) {
    const key = resolveBestMatch(validity);
    return key ? (labelMap[key] || defaultLabels[key]) : '';
}

export class FieldConstraintApi {
    constructor(componentProvider, constraints) {
        this._getComponent = componentProvider;
        this._constraints = {
            ...constraints,
            customError: () =>
                typeof this._customMessage === 'string' && this._customMessage !== ''
        };
    }

    get inputComponent() {
        return this._element ||= this._getComponent();
    }

    get validity() {
        return this._validity ||= createValidity(this._constraints);
    }

    checkValidity() {
        const valid = this.validity.valid;
        if (!valid) {
            this.inputComponent?.dispatchEvent(new CustomEvent('invalid', { cancellable: true }));
        }
        return valid;
    }

    reportValidity(callback) {
        const valid = this.checkValidity();
        this.inputComponent?.classList.toggle('slds-has-error', !valid);
        callback?.(this.validationMessage);
        return valid;
    }

    setCustomValidity(message) {
        this._customMessage = message;
        this._validity = null; // force re-evaluation
    }

    get validationMessage() {
        const c = this.inputComponent;
        return getErrorMessage(this.validity, {
            customError: this._customMessage,
            valueMissing: c?.messageWhenValueMissing
        });
    }
}
