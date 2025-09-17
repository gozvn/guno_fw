import {AfterViewInit, Component, EventEmitter, HostListener, Input, OnChanges, Output} from '@angular/core';

@Component({
    selector: 'app-paginator',
    templateUrl: './paginator.component.html',
    styleUrl: './paginator.component.scss'
})
export class PaginatorComponent implements AfterViewInit, OnChanges {

    @Input() pageSize: number = 30;
    @Input() pageIndex = 1;
    @Input() length = 0;

    @Input() pageSizeOptions: number[] = [20, 30, 50, 100];
    @Output() page: EventEmitter<any> = new EventEmitter();

    dataPageSizes: any = [];
    public pages: number[] = [];
    public totalPage: number = 0;

    public groupPages: any = [];
    public groupPage: any = [];

    firstPageIndex = 1;
    lastPageIndex = 1;

    @HostListener('keypress', ['$event'])
    onKeyPress(event: any) {
        if (event.key === 'Enter') {
            let pageIndex = parseInt(event.target.value);
            pageIndex = isNaN(pageIndex) ? 1 : pageIndex;
            this.onClickPage(pageIndex);
        }
    }

    constructor() {

    }

    private getPageCount(): number {
        let totalPage = 0;
        if (this.length > 0 && this.pageSize > 0) {
            const pageCount = this.length / this.pageSize;
            const roundedPageCount = Math.floor(pageCount);
            totalPage = roundedPageCount < pageCount ? roundedPageCount + 1 : roundedPageCount;
        }
        this.totalPage = totalPage;
        return totalPage;
    }

    private getArrayOfPage(pageCount: number): number [] {
        const pageArray = [];
        if (pageCount > 0) {
            for(let i = 1 ; i <= pageCount ; i++) {
                pageArray.push(i);
            }
        }
        return pageArray;
    }

    getGroupPages() {
        const groupPages = [];
        const countItemInGroup = 5;
        const countGroup = Math.ceil(this.totalPage / countItemInGroup);
        for (let i=0; i < countGroup; i++) {
            const start = i * countItemInGroup;
            groupPages[i] = this.pages.slice(start, start + countItemInGroup);
        }

        return groupPages;
    }

    slicePages(page: number) {
        const countPage = this.pages.length;
        let start = page - 3,
            length = 5;
        start = start < 0 ? 0 : start;
        return this.pages.slice(start, start + length);
    }

    onClickPage(pageNumber: number): void {
        if (pageNumber >= 1 && pageNumber <= this.pages[this.pages.length - 1]) {
            this.pageIndex = pageNumber;
            this.page.emit({
                pageIndex: this.pageIndex,
                pageSize: this.pageSize
            });
        }
    }

    onClickNext() {
        this.pageIndex++;
        this.page.emit({
            pageIndex: this.pageIndex,
            pageSize: this.pageSize
        });
    }

    onClickPrev() {
        this.pageIndex--;
        this.page.emit({
            pageIndex: this.pageIndex,
            pageSize: this.pageSize
        });
    }

    onClickFirst() {
        this.pageIndex = 1;
        this.page.emit({
            pageIndex: this.pageIndex,
            pageSize: this.pageSize
        });
    }

    onClickLast() {
        this.pageIndex = this.pages[this.pages.length - 1];
        this.page.emit({
            pageIndex: this.pageIndex,
            pageSize: this.pageSize
        });
    }

    isFirstGroupPage() {
        return this.groupPage.indexOf(this.firstPageIndex) >= 0;
    }

    isLastGroupPage() {
        return this.groupPage.indexOf(this.totalPage) >= 0;
    }

    ngAfterViewInit() {

    }

    ngOnChanges(e: any): any {
        this.pageSizeOptions = e.pageSizeOptions?.currentValue || this.pageSizeOptions;
        this.pageSize = e.pageSize?.currentValue || this.pageSize;
        this.pageIndex = e.pageIndex?.currentValue || this.pageIndex;
        this.pageIndex = parseInt(this.pageIndex.toString());
        this.dataPageSizes = [];
        if (this.pageSizeOptions.length) {
            for (const i of this.pageSizeOptions) {
                const selected = i == this.pageSize;
                this.dataPageSizes.push({
                    id: i,
                    text: i,
                    selected: selected
                });
            }
        }

        const pageCount = this.getPageCount();
        this.pages = this.getArrayOfPage(pageCount);
        this.groupPages = this.getGroupPages();
        this.groupPage = this.groupPages.find((e: number[]) => e.indexOf(this.pageIndex) >= 0);
        this.groupPage = typeof this.groupPage !== 'undefined' ? this.groupPage : []
    }
}
