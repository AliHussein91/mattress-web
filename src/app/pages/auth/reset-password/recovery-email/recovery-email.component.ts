import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SimpleHeaderComponent } from '../../../../shared/components/simple-header/simple-header.component';

@Component({
  selector: 'app-recovery-email',
  standalone: true,
  imports: [SimpleHeaderComponent, TranslateModule, ReactiveFormsModule],
  templateUrl: './recovery-email.component.html',
  styleUrl: './recovery-email.component.scss'
})
export class RecoveryEmailComponent {

  fb = inject(FormBuilder)
  router = inject(Router)
  activatedRoute = inject(ActivatedRoute)
  passRecoveryForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
  })

  onSubmit() {
    console.log(this.passRecoveryForm.getRawValue());
    this.router.navigate(['verification'], { relativeTo: this.activatedRoute })
  }

}
