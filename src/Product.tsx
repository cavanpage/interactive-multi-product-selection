interface IProductOption{
    name: string,
    count:number
}

class Product{
  public options: IProductOption[] = [];  
  public selected: IProductOption[] = [];
  private maxSelectionCount = 3;

  constructor(optionNames: string[], maxSelectionCount: number){
    this.maxSelectionCount = maxSelectionCount;

    optionNames.forEach(optionName => {
      this.options.push({
        name: optionName,
        count: 0
      });
    });        
  }

  public add(option: string, count:number): boolean{
    var success = true;

    if(this.selected.length >= this.maxSelectionCount){
      alert("You may only choose "+ this.maxSelectionCount + " flavor(s). Please unselect a flavor to choose another.")
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