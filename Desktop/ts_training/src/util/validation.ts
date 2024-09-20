namespace App {
  //validation
  export interface Validatable {
    value: string | number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
  }

  export function validate(validatabkeInput: Validatable){
    let isValid = true;
    if(validatabkeInput.required) {
      isValid = isValid && validatabkeInput.value.toString().trim().length !== 0;
    }

    if(validatabkeInput.minLength != null && typeof validatabkeInput.value === 'string'){
      isValid = validatabkeInput.value.length >= validatabkeInput.minLength;
    }

    if(validatabkeInput.maxLength != null && typeof validatabkeInput.value === 'string'){
      isValid = validatabkeInput.value.length <= validatabkeInput.maxLength;
    }

    if(validatabkeInput.min != null && typeof validatabkeInput.value === 'number'){
      isValid = validatabkeInput.value >= validatabkeInput.min;
    }

    if(validatabkeInput.max != null && typeof validatabkeInput.value === 'number'){
      isValid = validatabkeInput.value <= validatabkeInput.max;
    }

    return isValid;
  }

}