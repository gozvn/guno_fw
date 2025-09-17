import {Directive, ElementRef, Input, OnInit} from '@angular/core';

@Directive({
    selector: '[appLazyLoadImage]',
})
export class LazyLoadImageDirective implements OnInit {

    @Input('appLazyLoadImage') src!: string;

    constructor(private el: ElementRef<HTMLImageElement>) {
    }

    ngOnInit() {
        const imgElement = this.el.nativeElement;

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                imgElement.src = this.src;
                observer.unobserve(imgElement);
            }
        });

        observer.observe(imgElement);
    }
}
