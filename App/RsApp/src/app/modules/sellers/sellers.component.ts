import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-sellers',
  templateUrl: './sellers.component.html',
  styleUrls: ['./sellers.component.css']
})
export class SellersComponent implements OnInit {

  @ViewChild('sellerImageInput') sellerImageInput!: ElementRef<HTMLInputElement>;
  @ViewChild('cnicFrontInput') cnicFrontInput!: ElementRef<HTMLInputElement>;
  @ViewChild('cnicBackInput') cnicBackInput!: ElementRef<HTMLInputElement>;

  sellerForm!: FormGroup;
  formSaved = false;

  constructor(private fb: FormBuilder) { }

  nameFormatValidator = (control: AbstractControl): ValidationErrors | null => {
    const value = (control.value || '').trim();
    const startsWithNumber = /^\d/.test(value);
    const hasMinLength = value.length >= 3;

    return !startsWithNumber && hasMinLength ? null : { sellerNameFormat: true };
  };

  ngOnInit(): void {
    this.sellerForm = this.fb.group({
      sellerName: ['', [Validators.required, Validators.minLength(3), this.nameFormatValidator]],
      mobileNumber: ['', [Validators.required, Validators.pattern(/^03\d{2}-\d{7}$/)]],
      cnicNumber: ['', [Validators.required, Validators.pattern(/^\d{5}-\d{7}-\d$/)]],
      plotLocation: ['', [Validators.required, Validators.minLength(3)]],
      plotSize: ['', [Validators.required, Validators.pattern(/^\d+(\.\d+)?$/)]],
      pricePerMarla: ['', [Validators.required, Validators.pattern(/^\d+(\.\d+)?$/)]],
      bankName: [''],
      accountNumber: [''],
      payment: ['', [Validators.pattern(/^\d+(\.\d+)?$/)]],
      totalAmount: [{ value: '', disabled: true }],
      sellerImage: [null],
      cnicFront: [null],
      cnicBack: [null]
    });

    this.sellerForm.get('pricePerMarla')?.valueChanges.subscribe(() => this.computeTotalAmount());
    this.sellerForm.get('plotSize')?.valueChanges.subscribe(() => this.computeTotalAmount());
  }

  get f() {
    return this.sellerForm.controls;
  }

  onPhoneInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const formatted = this.formatPakistanPhone(input.value);
    this.sellerForm.patchValue({ mobileNumber: formatted }, { emitEvent: false });
  }

  onCnicInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const formatted = this.formatCnic(input.value);
    this.sellerForm.patchValue({ cnicNumber: formatted }, { emitEvent: false });
  }

  onFileChange(event: Event, controlName: string) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.sellerForm.patchValue({ [controlName]: input.files[0] });
    }
  }

  saveSeller() {
    this.formSaved = false;

    if (this.sellerForm.invalid) {
      this.sellerForm.markAllAsTouched();
      return;
    }

    const sellerData = { ...this.sellerForm.value };
    console.log('Seller saved:', sellerData);
    this.formSaved = true;
    this.resetForm();
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
    this.sellerForm.reset();
    this.sellerForm.markAsPristine();
    this.sellerForm.markAsUntouched();

    if (this.sellerImageInput) {
      this.sellerImageInput.nativeElement.value = '';
    }
    if (this.cnicFrontInput) {
      this.cnicFrontInput.nativeElement.value = '';
    }
    if (this.cnicBackInput) {
      this.cnicBackInput.nativeElement.value = '';
    }
  }

  private computeTotalAmount() {
    const price = parseFloat(this.sellerForm.get('pricePerMarla')?.value || '0');
    const size = parseFloat(this.sellerForm.get('plotSize')?.value || '0');
    const total = (isFinite(price) ? price : 0) * (isFinite(size) ? size : 0);
    this.sellerForm.patchValue({ totalAmount: total ? total.toString() : '' }, { emitEvent: false });
  }

}
