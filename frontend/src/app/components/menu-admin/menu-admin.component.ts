import { Component, inject, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrl: './menu-admin.component.css',
  host: { '[attr.id]': "'menuAdmin-component-id'" } 
})
export class MenuAdminComponent implements OnInit{

  adminService = inject(AdminService);
  arrUsers: any[] = [];
  private toastr = inject(ToastrService);
  
  
  constructor() {}

  ngOnInit() {
    const users = this.adminService.getAll().subscribe(
      data => {
        this.arrUsers = data;
      },
      response => {
        console.log('Respuesta del servidor:', response);
      }
    );
  }

  async borrarUsuario(event: any, userId: String){
    const user = await this.adminService.deleteById(userId);
    console.log(user);

    if(!user.error && confirm('Estas seguro de eliminar este usuario?')){
      this.adminService.getAll();
      this.toastr.success('El usuario fue eliminado con con éxito', 'Usuario Eliminado');
    } else {
      console.log(user.error);
      this.toastr.error('Hubo un error al eliminar el usuario', 'Error');
    }
  }

}
