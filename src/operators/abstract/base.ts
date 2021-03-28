abstract class Operator {
    protected readonly operator

    constructor(operator:string) {
      this.operator = operator;
    }

    abstract exec():string

    abstract validate ():void
}

export default Operator;
