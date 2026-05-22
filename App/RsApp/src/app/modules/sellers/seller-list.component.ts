import { Component, OnInit } from '@angular/core';
import { SellersService } from './sellers.service';

@Component({
  selector: 'app-seller-list',
  templateUrl: './seller-list.component.html',
  styleUrls: ['./seller-list.component.css']
})
export class SellerListComponent implements OnInit {
  sellers: any[] = [];

  constructor(private sellersService: SellersService) { }

  ngOnInit(): void {
    this.loadSellers();
  }

  loadSellers(): void {
    this.sellers = this.sellersService.getSellers();
  }
}
