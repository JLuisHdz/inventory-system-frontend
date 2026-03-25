import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../core/services/user.service';
import Swal from 'sweetalert2';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {

  users: any[] = [];

  currentPage: number = 0;
  totalPages: number = 0;
  pageSize: number = 5;

  isLoading = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {

    this.isLoading = true;

    this.userService.getAll(this.currentPage, this.pageSize)
      .subscribe({

        next: response => {

          // ⚠️ Ajusta según tu backend
          this.users = response.data.content;
          this.totalPages = response.data.totalPages;

          this.isLoading = false;
        },

        error: err => {
          console.error(err);
          this.isLoading = false;
        }

      });

  }

  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.loadUsers();
    }
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadUsers();
    }
  }

  deleteUser(id: number): void {

    Swal.fire({
      title: 'Delete user?',
      text: 'This action cannot be undone',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete'
    }).then(result => {

      if (result.isConfirmed) {

        this.userService.delete(id).subscribe({

          next: () => {
            Swal.fire('Deleted!', 'User removed', 'success');
            this.loadUsers();
          },

          error: () => {
            Swal.fire('Error', 'Could not delete user', 'error');
          }

        });

      }

    });

  }
}
