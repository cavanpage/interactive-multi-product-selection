interface ILogger{
    log: string[],
    write(message: string): void,
  }
  class Logger implements ILogger{
    public log: string[] = [];
    public write(message:string){
      this.log.push(message);
      console.log(message);
    }
  }

export default Logger;