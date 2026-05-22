import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plots',
  templateUrl: './plots.component.html',
  styleUrls: ['./plots.component.css']
})
export class PlotsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  
  plots: any[] = [
    {
      id: 1,
      title: 'Gulberg 5 Marla Plot',
      location: 'Gulberg III · For Sale',
      type: 'residential',
      price: 'Rs 2.8Cr',
      status: 'New',
      iconType: 'residential'
    },
    {
      id: 2,
      title: 'DHA 10 Marla Corner',
      location: 'DHA Phase 6 · For Sale',
      type: 'corner',
      price: 'Rs 5.2Cr',
      status: 'Negotiating',
      iconType: 'corner'
    },
    {
      id: 3,
      title: 'Model Town 1 Kanal',
      location: 'Model Town · For Sale',
      type: 'residential',
      price: 'Rs 8.5Cr',
      status: 'Token Done',
      iconType: 'commercial'
    },
    {
      id: 4,
      title: 'Bahria Town 3 Marla',
      location: 'Bahria Orchard · Buyer Need',
      type: 'residential',
      price: 'Rs 1.4Cr',
      status: 'Urgent',
      iconType: 'farmhouse'
    }
  ];
 
  getStatusClass(status: string): string {
    const map: Record<string, string> = {
      'New': 'status-new',
      'Negotiating': 'status-negotiating',
      'Token Done': 'status-token',
      'Urgent': 'status-urgent',
      'Available': 'status-available',
      'Sold': 'status-sold'
    };
    return map[status] || 'status-available';
  }
 
  getIconClass(iconType: string): string {
    const map: Record<string, string> = {
      'residential': 'icon-blue',
      'corner': 'icon-teal',
      'commercial': 'icon-amber',
      'farmhouse': 'icon-purple'
    };
    return map[iconType] || 'icon-blue';
  }
 
  onSabDekho(): void {
    console.log('View all listings clicked');
    // Navigate to full listings page
    // this.router.navigate(['/listings']);
  }
 
  onPlotClick(plot: any): void {
    console.log('Plot clicked:', plot);
    // Navigate to plot detail page
    // this.router.navigate(['/listings', plot.id]);
  }

}
