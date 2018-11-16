

class Point
{
    constructor(name)
    {
        this.PointName = name;
    }
    EvalSome(data)
    {
        var res = data*data;
        this.currentValue = res;
        return res;
    }
}

function TestClass()
{
    let point = new Point("T1");
   var evalValue = point.EvalSome(25);


}