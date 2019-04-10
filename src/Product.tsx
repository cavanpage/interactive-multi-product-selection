interface IProductOption{
    name: string,
    count:number
}

class Product{
  public options: IProductOption[] = [];  
  public selected: IProductOption[] = [];
  public count: number = 0;

  public choose = 3;

  constructor(){
    let options: string[] =  ["French Roast", "Vanilla Nut", "Cherry", "Oak", "Mango"];
    for(let i =0; i < options.length; i++){
      let flavor: IProductOption = {
          name: options[i],
          count: 0
      };
      this.options.push(flavor);
    }
    this.count = this.options.length;
  }

  public add(option: string): boolean{
    var success = true;

    if(this.selected.length >= this.choose){
      alert("You may only choose "+ this.choose + " flavor(s). Please unselect a flavor to choose another.")
      success =  false;
    }
    else{
      let selectedProduct = this.options.find(p => p.name == option);
      if(selectedProduct != undefined) {
        this.selected.push(selectedProduct);
        success =  true;
      }
      else success = false;
      
    }
    return success;
  }

  public remove(option: string): boolean{
    var success = true;
    if(this.selected.length <= 0){
      success =  false;
    }
    else{   
      let selectedProduct = this.options.find(p => p.name == option);

      if(selectedProduct != undefined){
        var index = this.selected.indexOf(selectedProduct);
        this.selected.splice(index, 1);
        if(index == -1)success =  false;
        else {
          success = true;   
          selectedProduct.count = selectedProduct.count -1;
        }
      }
      else success = false;
    }
    return success;
  }
}

export default Product;