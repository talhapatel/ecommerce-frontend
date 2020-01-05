import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appAppPassword]'
})
export class AppPasswordDirective {
private _shown = false;
  constructor(private el: ElementRef) {
    this.setup();
   }

   setup(){
     const parent=this.el.nativeElement.parentNode;
     const span=document.createElement('span');
  //   span.className="glyphicon glyphicon-eye-open";
  span.innerHTML="show password";
      span.addEventListener('click',(event)=>{
        this.toggle(span);
      })
      parent.append(span);
   }
   toggle(span){
this._shown=!this._shown;
if(this._shown){
  this.el.nativeElement.setAttribute('type','text');
 // span.className="";
 span.innerHTML="hide password";
}else{
  this.el.nativeElement.setAttribute('type','password');
 // span.className="glyphicon glyphicon-eye-open";
 span.innerHTML="show password";
}
   }

}
