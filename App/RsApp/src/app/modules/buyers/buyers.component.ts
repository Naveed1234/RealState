import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { BuyersService } from './buyers.service';

@Component({
  selector: 'app-buyers',
  templateUrl: './buyers.component.html',
  styleUrls: ['./buyers.component.css']
})
export class BuyersComponent implements OnInit {

  @ViewChild('buyerImageInput') buyerImageInput!: ElementRef<HTMLInputElement>;
  @ViewChild('cnicFrontInput') cnicFrontInput!: ElementRef<HTMLInputElement>;
  @ViewChild('cnicBackInput') cnicBackInput!: ElementRef<HTMLInputElement>;

  buyerForm!: FormGroup;
  formSaved = false;

  constructor(private fb: FormBuilder, private buyersService: BuyersService) { }

 nameFormatValidator = (control: AbstractControl): ValidationErrors | null => {

  const value = (control.value || '').trim();
  const startsWithNumber = /^\d/.test(value);
  const hasMinLength = value.length >= 3;

  return !startsWithNumber && hasMinLength ? null: { buyerNameFormat: true };
};

  ngOnInit(): void {
    this.buyerForm = this.fb.group({
      buyerName: ['', [Validators.required, Validators.minLength(3), this.nameFormatValidator]],
      mobileNumber: ['', [Validators.required, Validators.pattern(/^03\d{2}-\d{7}$/)]],
      cnicNumber: ['', [Validators.required, Validators.pattern(/^\d{5}-\d{7}-\d$/)]],
      plotLocation: ['', [Validators.required, Validators.minLength(3)]],
      plotSize: ['', [Validators.required, Validators.pattern(/^\d+(\.\d+)?$/)]],
      pricePerMarla: ['', [Validators.required, Validators.pattern(/^\d+(\.\d+)?$/)]],
      bankName: [''],
      accountNumber: [''],
      payment: ['', [Validators.pattern(/^\d+(\.\d+)?$/)]],
      totalAmount: [{ value: '', disabled: true }],
      buyerImage: [null],
      cnicFront: [null],
      cnicBack: [null]
    });

    // compute total amount when price or size changes
    this.buyerForm.get('pricePerMarla')?.valueChanges.subscribe(() => this.computeTotalAmount());
    this.buyerForm.get('plotSize')?.valueChanges.subscribe(() => this.computeTotalAmount());
  }

  get f() {
  return this.buyerForm.controls;
}

  onPhoneInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const formatted = this.formatPakistanPhone(input.value);
    this.buyerForm.patchValue({ mobileNumber: formatted }, { emitEvent: false });
  }

  onCnicInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const formatted = this.formatCnic(input.value);
    this.buyerForm.patchValue({ cnicNumber: formatted }, { emitEvent: false });
  }

  onFileChange(event: Event, controlName: string) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.buyerForm.patchValue({ [controlName]: { name: file.name, url: reader.result } });
      };
      reader.readAsDataURL(file);
    }
  }

  saveBuyer() {
    this.formSaved = false;

    if (this.buyerForm.invalid) {
      this.buyerForm.markAllAsTouched();
      return;
    }

    const buyerData = { ...this.buyerForm.value };

    this.buyersService.saveBuyer(buyerData).subscribe(() => {
      this.formSaved = true;
      this.resetForm();
    });
  }

  private formatPakistanPhone(value: string): string {
    const digits = value.replace(/\D/g, '').slice(0, 11);
    if (!digits) {
      return '';
    }
    const prefix = digits.slice(0, 4);
    const suffix = digits.slice(4);
    return suffix ? `${prefix}-${suffix}` : prefix;
  }

  private formatCnic(value: string): string {
    const digits = value.replace(/\D/g, '').slice(0, 13);
    const part1 = digits.slice(0, 5);
    const part2 = digits.slice(5, 12);
    const part3 = digits.slice(12);
    return [part1, part2, part3].filter(Boolean).join('-');
  }

  private resetForm() {
    this.buyerForm.reset();
    this.buyerForm.markAsPristine();
    this.buyerForm.markAsUntouched();

    if (this.buyerImageInput) {
      this.buyerImageInput.nativeElement.value = '';
    }
    if (this.cnicFrontInput) {
      this.cnicFrontInput.nativeElement.value = '';
    }
    if (this.cnicBackInput) {
      this.cnicBackInput.nativeElement.value = '';
    }
  }

  private computeTotalAmount() {
    const price = parseFloat(this.buyerForm.get('pricePerMarla')?.value || '0');
    const size = parseFloat(this.buyerForm.get('plotSize')?.value || '0');
    const total = (isFinite(price) ? price : 0) * (isFinite(size) ? size : 0);
    this.buyerForm.patchValue({ totalAmount: total ? total.toString() : '' }, { emitEvent: false });
  }

}
