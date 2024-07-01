import '../css/index.scss'

console.log(`hellox`)

class Foo {
 private xxxx() {
    console.log(`foxo`)
  }

  public bar(){
    this.xxxx()
  }
}


new Foo().bar()
