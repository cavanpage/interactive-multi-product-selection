interface IProductOption{
    name: string,
    count:number
}

class Product{
  public options: IProductOption[] = [];  
  public selected: IProductOption[] = [];
  private choose = 3;

  constructor(optionNames: string[], choose: number){
    this.choose = choose;

    for(let i =0; i < optionNames.length; i++){
      let flavor: IProductOption = {
          name: optionNames[i],
          count: 0
      };
      this.options.push(flavor);
    }
  }

  public add(option: string, count:number): boolean{
    var success = true;

    if(this.selected.length >= this.choose){
      alert("You may only choose "+ this.choose + " flavor(s). Please unselect a flavor to choose another.")
      success =  false;
    }
    else{
      let selectedProduct = this.options.find(p => p.name == option);
      if(selectedProduct != undefined) {
        this.selected.push(selectedProduct);
        selectedProduct.count = selectedProduct.count +count;
        success =  true;
      }
      else success = false;
      
    }
    return success;
  }

  public remove(option: string, count:number): boolean{
    var success = true;
    if(this.selected.length <= 0){
      success =  false;
    }
    else{   
      let selectedProduct = this.options.find(p => p.name == option);

      if(selectedProduct != undefined){      

        //remove from selected list
        for(let i =0; i < count; i++){
          var index = this.selected.indexOf(selectedProduct);
          this.selected.splice(index, 1);
        }   

        selectedProduct.count = selectedProduct.count -count;
        success = true;
      }
      else success = false;
    }
    return success;
  }
}

export default Product;