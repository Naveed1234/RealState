import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  openMenu: 'buyers' | 'sellers' | 'installments' | null = null;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.updateOpenMenu(this.router.url);
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe(event => this.updateOpenMenu(event.urlAfterRedirects));
  }

  toggleMenu(menu: 'buyers' | 'sellers' | 'installments'): void {
    this.openMenu = this.openMenu === menu ? null : menu;
  }

  private updateOpenMenu(url: string): void {
    if (url.startsWith('/buyers')) {
      this.openMenu = 'buyers';
    } else if (url.startsWith('/sellers')) {
      this.openMenu = 'sellers';
    } else if (url.startsWith('/installments')) {
      this.openMenu = 'installments';
    } else {
      this.openMenu = null;
    }
  }
}

