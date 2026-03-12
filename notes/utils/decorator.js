class Decorator{
  static drawLine(){
    console.log("=".repeat(30));
  }
  static presentMenu(){
   drawLine();
  console.log("\n");
  console.log(`${welcome}`);
  Decorator.drawLine();
  }
}
module.exports = Decorator;


