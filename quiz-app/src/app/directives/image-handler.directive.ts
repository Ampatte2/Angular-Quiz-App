import { Directive, Input, HostBinding } from '@angular/core';

@Directive({
  selector: 'img[default]',
  host:{
    '(error)': "updateUrl()",
    //'(load)': 'load()',
    '[src]': 'src',
    '[class]': "class"
    
  }
})
export class ImageHandlerDirective {
  @Input() src:string;
  @Input() default: string;

  @HostBinding("style.max-height") maxHeight: string = "70%";
  @HostBinding("style.left") left: string = "0";

  defaultImgs: object= {"angular": "https://cdn.worldvectorlogo.com/logos/angular-icon.svg", 
  "react":"https://cdn.worldvectorlogo.com/logos/react.svg", 
  "node.js": "https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg",
  "mysql": "https://cdn.worldvectorlogo.com/logos/mysql.svg",
  ".net": "https://cdn.worldvectorlogo.com/logos/microsoft-net.svg",
  "java": "https://cdn.worldvectorlogo.com/logos/java-4.svg" }

  updateUrl(){
    this.maxHeight = "50px";
    this.left="20vw";
    this.src = this.defaultImgs[this.default]
  }
  //load(){}

}
