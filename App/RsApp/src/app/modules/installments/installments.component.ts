import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-installments',
  templateUrl: './installments.component.html',
  styleUrls: ['./installments.component.css']
})
export class InstallmentsComponent implements OnInit, OnDestroy {
  viewMode: 'plan' | 'plans' = 'plans';
  selectedPlan: any = null;
  private routerSubscription!: Subscription;

  installmentPlans = [
    {
      id: 'plan-a',
      tag: 'Residential Plot',
      size: '3.5 MARLA',
      title: 'Jazac Signature',
      description: 'A premium residential plot plan with flexible milestones and easy tenures.',
      plotPrice: '2,782,500',
      pricePerMarla: '795,000',
      bookingPercent: '5%',
      bookingAmount: '139,125',
      possessionPercent: '15%',
      possessionAmount: '417,375',
      tenure: '24 months',
      totalAmount: '2,782,500',
      monthly: '115,938',
      dueNext: '2025-06-10',
      status: 'Active',
      details: 'Designed for buyers who want a strong ROI and structured installment milestones with timely support.',
      image: 'https://via.placeholder.com/640x360?text=Residential+Plot'
    },
    {
      id: 'plan-b',
      tag: 'Residential Plot',
      size: '5 MARLA',
      title: 'Jazac Family Plan',
      description: 'A family-friendly plan with an accelerated payment schedule and lower long-term cost.',
      plotPrice: '3,975,000',
      pricePerMarla: '795,000',
      bookingPercent: '10%',
      bookingAmount: '397,500',
      possessionPercent: '15%',
      possessionAmount: '596,250',
      tenure: '18 months',
      totalAmount: '3,975,000',
      monthly: '220,833',
      dueNext: '2025-05-28',
      status: 'Pending',
      details: 'Perfect for families seeking balance between down payment and monthly installments.',
      image: 'https://via.placeholder.com/640x360?text=Family+Plot'
    },
    {
      id: 'plan-c',
      tag: 'Residential Plot',
      size: '7 MARLA',
      title: 'Jazac Investor Plan',
      description: 'A strong investment plan for buyers targeting higher yield and premium delivery dates.',
      plotPrice: '5,565,000',
      pricePerMarla: '795,000',
      bookingPercent: '8%',
      bookingAmount: '445,200',
      possessionPercent: '12%',
      possessionAmount: '667,800',
      tenure: '20 months',
      totalAmount: '5,565,000',
      monthly: '278,250',
      dueNext: '2025-07-01',
      status: 'Approved',
      details: 'Ideal for investors who want predictable EMI plans and fast property release timelines.',
      image: 'https://via.placeholder.com/640x360?text=Investor+Plot'
    }
  ];

  formatPrice(value: any): string {
    if (value == null) { return '' }
    const num = typeof value === 'number' ? value : Number(String(value).replace(/[^0-9.-]+/g, ''));
    if (isNaN(num)) { return String(value); }
    if (num >= 10000000) {
      const cr = (num / 10000000);
      return `Rs ${cr % 1 === 0 ? cr.toFixed(0) : cr.toFixed(1)}Cr`;
    }
    if (num >= 100000) {
      // show in thousands with K for readability
      const k = Math.round(num / 1000);
      return `Rs ${k}K`;
    }
    return `Rs ${new Intl.NumberFormat().format(num)}`;
  }

  statusClass(status: string): string {
    switch ((status || '').toLowerCase()) {
      case 'active': return 'badge-active';
      case 'pending': return 'badge-pending';
      case 'approved': return 'badge-approved';
      default: return 'badge-default';
    }
  }

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.updateViewMode(this.router.url);
    this.routerSubscription = this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe(event => this.updateViewMode(event.urlAfterRedirects));
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  private updateViewMode(url: string): void {
    if (url.includes('/installments/plan')) {
      this.viewMode = 'plan';
    } else {
      this.viewMode = 'plans';
    }
  }

  openDetail(plan: any): void {
    this.selectedPlan = plan;
  }

  closeDetail(): void {
    this.selectedPlan = null;
  }
}
