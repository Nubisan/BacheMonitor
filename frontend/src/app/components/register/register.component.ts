import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  host: { '[attr.id]': "'register-component-id'" } 
})
export class RegisterComponent {

  registerForm: FormGroup;
  formSubmitted: boolean = false;
  activateRoute = inject(ActivatedRoute);
  adminService = inject(AdminService);
  userId = signal('');
  existingPassword: string = '';

  constructor(private router: Router, private toastr: ToastrService) {
    this.registerForm = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]),
      apellido: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]),
      email: new FormControl('', [Validators.required, Validators.email, Validators.pattern(/^[a-zA-Z0-9._%+-]+@ups\.edu\.ec$/)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)]),
      role: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    if (this.userId()) {
      this.editarUsuario();
    } else {
      this.crearUsuario();
    }
  }

  crearUsuario() {
    if (this.registerForm.invalid) {
      this.formSubmitted = true;
      return;
    } 

    this.adminService.register(this.registerForm.value).subscribe(
      response => {
        this.toastr.success('El usuario fue registrado con éxito', 'Usuario Registrado');
        console.log(response); // Aquí se muestra la respuesta del backend
        this.router.navigate(['/menuAdmin']);
      },
      error => {
        console.error(error);
        this.toastr.error('Hubo un error en el registro', 'Error');
      }
    );
  }

  async editarUsuario() {

    try {
      const formValue = this.registerForm.value;
      // Mantener la contraseña existente si el campo está vacío
      if (formValue.password === '') {
        formValue.password = this.existingPassword;
      }
      const response = await this.adminService.update(this.userId(), this.registerForm.value);
      this.toastr.success('El usuario fue actualizado con éxito', 'Usuario Actualizado');
      this.router.navigate(['/menuAdmin']);
    } catch (error) {
      this.toastr.error('Hubo un error al actualizar', 'Error');
    }
  }
  
  ngOnInit() {
    this.activateRoute.params.subscribe(async params =>{
      const userId = params['userId'];
      this.userId.set(userId);
      const user = await this.adminService.getById(userId);
      console.log(user);

      // Guardar la contraseña existente
      this.existingPassword = user.password;

      //Rellenar el formulario
      delete user._id;
      delete user.__v;
      delete user.createdAt;
      delete user.updatedAt;
      this.registerForm.setValue(user);
       // la mantendrá vacía durante la edición
       this.registerForm.get('password')?.setValue('');
    })
  }
}

