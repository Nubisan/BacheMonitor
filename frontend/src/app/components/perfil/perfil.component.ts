import { Component, inject, OnInit } from '@angular/core';
import { OperatorService } from '../../services/operator.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  
  operService = inject(OperatorService);
  id: string | null = null;
  user: any = {};
  showChangePassword = false;
  newPassword = '';
  passwordError = '';
  private toastr = inject(ToastrService);

  async ngOnInit() {
    this.id = this.operService.getId();
    if (this.id) {
      try {
        this.user = await this.operService.getUser(this.id);
        console.log(this.user);
      } catch (error) {
        this.toastr.error('Error al cargar los datos del usuario', 'Error');
      }
    }
  }

  changePassword() {
    this.showChangePassword = !this.showChangePassword;
  }

  validatePassword(password: string): boolean {
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    return passwordPattern.test(password);
  }

  async updatePassword() {
    if (this.validatePassword(this.newPassword)) {
      try {
        await this.operService.updatePassword(this.id, this.newPassword);
        this.toastr.success('Su contraseña fue cambiada con éxito', 'Contraseña Actualizada');
        this.showChangePassword = false;
        this.newPassword = '';
        this.passwordError = '';
      } catch (error) {
        this.toastr.error('Hubo un error al actualizar', 'Error');
      }
    } else {
      this.passwordError = 'La contraseña debe tener al menos 6 caracteres, incluyendo letras y números.';
    }
  }

  cancelChangePassword() {
    this.showChangePassword = false;
    this.newPassword = '';
    this.passwordError = '';
  }
}
