import { Component, OnInit } from '@angular/core';
import { BuyersService } from './buyers.service';

@Component({
  selector: 'app-buyer-list',
  templateUrl: './buyer-list.component.html',
  styleUrls: ['./buyer-list.component.css']
})
export class BuyerListComponent implements OnInit {
  buyers: any[] = [];
  selectedBuyer: any = null;
  selectedImage: string | null = null;
  imageZoom = 1;
  private gridApi: any;
  private columnApi: any;

  columnDefs = [
    { field: 'buyerName', headerName: 'Full Name' },
    { field: 'mobileNumber', headerName: 'Mobile' },
    { field: 'cnicNumber', headerName: 'CNIC' },
    { field: 'plotLocation', headerName: 'Location' },
    { field: 'plotSize', headerName: 'Plot Size' },
    { field: 'pricePerMarla', headerName: 'Price / Marla', width: 200 },
    { field: 'totalAmount', headerName: 'Total' },
    { field: 'payment', headerName: 'Payment' },
    { field: 'bankName', headerName: 'Bank' },
    {
      headerName: 'Details',
      field: 'details',
      sortable: false,
      filter: false,
      resizable: false,
      width: 140,
      cellRenderer: (params: any) => {
        const button = document.createElement('button');
        button.className = 'btn btn-save btn-sm';
        button.textContent = 'Details';
        button.addEventListener('click', (event) => {
          event.stopPropagation();
          this.openBuyerDetail(params.data);
        });
        return button;
      }
    }
  ];

  defaultColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    flex: 1,
    minWidth: 120
  };

  constructor(private buyersService: BuyersService) { }

  ngOnInit(): void {
    this.loadBuyers();
  }

  onGridReady(params: any): void {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
    this.autoSizeAllColumns();
  }

  onFirstDataRendered(params: any): void {
    this.columnApi = params.columnApi;
    this.autoSizeAllColumns();
  }

  autoSizeAllColumns(): void {
    if (!this.columnApi) {
      return;
    }
    const allColumnIds: string[] = [];
    this.columnApi.getAllColumns().forEach((column: any) => allColumnIds.push(column.getColId()));
    this.columnApi.autoSizeColumns(allColumnIds, false);
  }

  onQuickFilterChanged(value: string): void {
    if (this.gridApi) {
      this.gridApi.setQuickFilter(value);
    }
  }

  loadBuyers(): void {
    this.buyers = this.buyersService.getBuyers();
  }

  openBuyerDetail(buyer: any): void {
    this.selectedBuyer = buyer;
    this.selectedImage = this.getImageUrl(buyer.buyerImage) || this.getImageUrl(buyer.cnicFront) || this.getImageUrl(buyer.cnicBack) || null;
    this.imageZoom = 1;
  }

  closeDetail(): void {
    this.selectedBuyer = null;
    this.selectedImage = null;
    this.imageZoom = 1;
  }

  selectImage(url: string | null): void {
    if (url) {
      this.selectedImage = url;
      this.imageZoom = 1;
    }
  }

  zoomIn(): void {
    this.imageZoom = Math.min(3, this.imageZoom + 0.25);
  }

  zoomOut(): void {
    this.imageZoom = Math.max(1, this.imageZoom - 0.25);
  }

  getImageUrl(value: any): string | null {
    if (!value) {
      return null;
    }
    if (typeof value === 'string') {
      return value;
    }
    return value.url || value;
  }
}
