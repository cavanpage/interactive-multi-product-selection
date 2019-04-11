interface ILogger{
    log: string[],
    enabled: boolean,
    write(message: string): void,
    
  }
  class Logger implements ILogger{  
    public log: string[] = [];
    public enabled: boolean = true;
    public write(message:string, printToConsole :boolean = false){
      this.log.push(message);
      printToConsole ? console.log(message): null;
    }
  }

export default Logger;