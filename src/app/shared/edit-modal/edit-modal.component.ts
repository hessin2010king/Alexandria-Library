import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.css']
})
export class EditModalComponent {
  @Input() item: any; // The item to be edited
  @Input() fields: string[] = []; // Fields to be edited
  @Input() title: string = 'Edit Item'; // Modal title
  @Output() save = new EventEmitter<any>(); // Event emitter for save action
  @Output() close = new EventEmitter<void>(); // Event emitter for closing the modal

  onSave() {
    this.save.emit(this.item);
  }

  onClose() {
    this.close.emit();
  }

  getLabel(field: string): string {
    const labels: { [key: string]: string } = {
      name: 'Name',
      photo: 'Photo URL',
      firstName: 'First Name',
      lastName: 'Last Name',
      dateOfBirth: 'Date of Birth',
      bookPhoto: 'Book Photo URL',
      bookName: 'Book Name',
      categoryId: 'Category ID',
      authorId: 'Author ID',
      bookDescription: 'Book Description'
    };
    return labels[field] || field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
  }

  getFieldType(field: string): string {
    return field === 'dateOfBirth' ? 'date' : 'text';
  }
}
