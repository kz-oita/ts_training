function Logger() {
  return function(constructor: Function){
    console.log("ログ出力中・・・");
    console.log(constructor);
  }
  
}

function WithTemplate(template: string, hookId: string){
  return function(_: Function){
    const hookEl = document.getElementById(hookId);
    if(hookEl){
      hookEl.innerHTML = template;
    }
  }
}

@WithTemplate("<h1>Person オブジェクト</h1>", "app")
class Person {
  name ="Max";

  constructor () {
    console.log("オブジェクトを作成中")
  }
}

const pers = new Person();

console.log(pers);



function Log(target: any, propertyName: string | Symbol) {
  console.log("Property decorator");
  console.log(target, propertyName);
}

class Product {

  @Log
  title: string;
  private _price: number;

  set price(val: number){
    if (val > 0){
      this._price = val;
    } else {
      throw new Error("不正な値です。");
    }
    
  }

  constructor(t: string, p:number) {
    this.title = t;
    this._price = p;
  }

  getPriceWithTax(tax: number){
    return this._price * (1 + tax)
  }
}
