import { ElementRef, OnInit, ViewChild } from '@angular/core';

// Cursor Animation Handler Class

export abstract class CursorClass implements OnInit {

  @ViewChild('cursor') cursor: ElementRef;
  @ViewChild('cursorFollower') cursorFollower: ElementRef;

  ngOnInit(): void {
    document.addEventListener('mousemove', (e) => {
      this.cursor.nativeElement.style.left = e.pageX + 'px';
      this.cursor.nativeElement.style.top = e.pageY + 'px';
      this.cursorFollower.nativeElement.style.left = e.pageX + 'px';
      this.cursorFollower.nativeElement.style.top = e.pageY + 'px';
    });

    document.addEventListener('mousedown', (e) => {
      this.cursor.nativeElement.classList.add('active');
      this.cursorFollower.nativeElement.classList.add('active');
    });

    document.addEventListener('mouseup', (e) => {
      this.cursor.nativeElement.classList.remove('active');
      this.cursorFollower.nativeElement.classList.remove('active');
    });
  }

}
