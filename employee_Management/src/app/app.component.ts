import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Employee {
  name: string;
  company: string;
  email: string;
  contact: string;
  designation: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'employee_Management';
  employeeForm: FormGroup;
  isEditMode = false;
  editIndex: number = 0;
  employees: Employee[] = [
    {
      name: 'Alice Johnson',
      company: 'TechSoft Ltd',
      email: 'alice.johnson@techsoft.com',
      contact: '9876543210',
      designation: 'Frontend Developer',
    },
    {
      name: 'Bob Smith',
      company: 'InnovateX',
      email: 'bob.smith@innovatex.com',
      contact: '9123456780',
      designation: 'Backend Developer',
    },
    {
      name: 'Carol White',
      company: 'Alpha Corp',
      email: 'carol.white@alphacorp.com',
      contact: '9988776655',
      designation: 'Full Stack Developer',
    },
    {
      name: 'David Miller',
      company: 'CodeCrafters',
      email: 'david.miller@codecrafters.com',
      contact: '9012345678',
      designation: 'Project Manager',
    },
    {
      name: 'Emily Davis',
      company: 'Webify Solutions',
      email: 'emily.davis@webify.com',
      contact: '9345678901',
      designation: 'UI/UX Designer',
    },
    {
      name: 'Frank Wilson',
      company: 'CloudNine Tech',
      email: 'frank.wilson@cloudnine.com',
      contact: '9567890123',
      designation: 'DevOps Engineer',
    },
    {
      name: 'Grace Lee',
      company: 'SoftVision',
      email: 'grace.lee@softvision.com',
      contact: '9678901234',
      designation: 'QA Analyst',
    },
    {
      name: 'Henry Adams',
      company: 'BrightWorks',
      email: 'henry.adams@brightworks.com',
      contact: '9456123780',
      designation: 'Business Analyst',
    },
    {
      name: 'Isabella Brown',
      company: 'DataNest',
      email: 'isabella.brown@datanest.com',
      contact: '9234567801',
      designation: 'Data Engineer',
    },
    {
      name: 'Jack Thompson',
      company: 'NeoTech',
      email: 'jack.thompson@neotech.com',
      contact: '9012345987',
      designation: 'Software Architect',
    },
  ];

  constructor(private fb: FormBuilder) {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      company: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contact: ['', Validators.required],
      designation: ['', Validators.required],
    });
  }

  public getInitials(name: string): string {
    const initialNames = name.trim().split(' ');
    if (initialNames.length === 0) return '';
    if (initialNames.length === 1)
      return initialNames[0].charAt(0).toUpperCase();
    const firstInitial = initialNames[0].charAt(0).toUpperCase();
    const lastInitial = initialNames[initialNames.length - 1]
      .charAt(0)
      .toUpperCase();

    return firstInitial + lastInitial;
  }

  public onSubmit() {
    if (this.employeeForm.invalid) return;
    const employee: Employee = this.employeeForm.value;
    if (this.isEditMode) {
      this.employees[this.editIndex] = employee;
      this.isEditMode = false;
    } else {
      this.employees.push(employee);
    }

    this.employeeForm.reset();
  }

  public onEdit(index: number) {
    this.employeeForm.setValue(this.employees[index]);
    this.isEditMode = true;
    this.editIndex = index;
  }

  public onDelete(index: number) {
    const confirmDelete = confirm(
      `Are you sure you want to delete ${this.employees[index].name}?`
    );
    if (confirmDelete) {
      this.employees.splice(index, 1);
    }
  }

  public onClear() {
    this.employeeForm.reset();
    this.isEditMode = false;
  }
}
