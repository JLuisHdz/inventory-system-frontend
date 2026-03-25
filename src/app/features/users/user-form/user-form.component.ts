import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserFormComponent implements OnInit {

  user: any = {
    username: '',
    nombre: '',
    password: '',
    roles: []
  };

  rolesList: string[] = ['ADMIN', 'MANAGER', 'EMPLOYEE'];

  selectedRoles: string[] = [];

  isEditMode = false;
  userId!: number;

  isSubmitting = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.userId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.userId) {
      this.isEditMode = true;
      this.loadUser();
    }

  }

  loadUser(): void {

    this.userService.getById(this.userId)
      .subscribe(response => {

        const user = response.data;

        this.user.username = user.username;
        this.user.nombre = user.nombre;

        // ⚠️ importante
        this.selectedRoles = user.roles;

      });

  }

  onRoleChange(role: string, event: any): void {

    if (event.target.checked) {
      this.selectedRoles.push(role);
    } else {
      this.selectedRoles = this.selectedRoles.filter(r => r !== role);
    }

  }

  onSubmit(): void {

    this.isSubmitting = true;

    const request = {
      ...this.user,
      roles: this.selectedRoles
    };

    if (this.isEditMode) {

      this.userService.update(this.userId, request)
        .subscribe({

          next: () => {
            Swal.fire('Success', 'User updated', 'success');
            this.router.navigate(['/users']);
          },

          error: () => {
            this.isSubmitting = false;
            Swal.fire('Error', 'Could not update user', 'error');
          }

        });

    } else {

      this.userService.create(request)
        .subscribe({

          next: () => {
            Swal.fire('Success', 'User created', 'success');
            this.router.navigate(['/users']);
          },

          error: () => {
            this.isSubmitting = false;
            Swal.fire('Error', 'Could not create user', 'error');
          }

        });

    }

  }

}
