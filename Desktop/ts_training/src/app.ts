//validation
interface Validatable {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

function validate(validatabkeInput: Validatable){
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





function autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
}

class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  mandayInputElement: HTMLInputElement;

  
  constructor() {
    this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement;
    this.hostElement = document.getElementById('app')! as HTMLDivElement;

    const importedNode = document.importNode(this.templateElement.content, true);
    this.element = importedNode.firstElementChild as HTMLFormElement;
    this.element.id = 'user-input';
    this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement;
    this.mandayInputElement = this.element.querySelector('#manday') as HTMLInputElement;
    
    this.configure();
    this.attach();
  }

  private gatherUserInput():[string, string, number] | void {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredManday  = this.mandayInputElement.value;

    const titleValidatable: Validatable = {
      value: enteredTitle,
      required: true,
    };

    const descriptionValidatable: Validatable = {
      value: enteredDescription,
      required: true,
      minLength:5,
    };

    const mandayValidatable: Validatable = {
      value: +enteredManday,
      required: true,
      min: 1,
      max: 1000,
    };

    if(
      !validate(titleValidatable) ||
      !validate(descriptionValidatable) ||
      !validate(mandayValidatable) 
    ){
      alert("未入力です");
      return;
    } else {
      return [enteredTitle,  enteredDescription, +enteredManday];
    }

  }

  @autobind
  private submitHandler(event: Event){
    event.preventDefault();
    console.log(this.titleInputElement.value);
    const userInput = this.gatherUserInput();
    if(Array.isArray(userInput)) {
      const [title, desc, manday] = userInput;
      console.log(title, desc, manday);
      this.clearInput();
    }
  }

  private clearInput () {
    this.titleInputElement.value = '';
    this.descriptionInputElement.value = '';
    this.mandayInputElement.value = '';
  }
  private configure(){
    this.element.addEventListener('submit', this.submitHandler);
  }

  private attach(){
    this.hostElement.insertAdjacentElement('afterbegin', this.element);
  }
}

const prjInput = new ProjectInput();