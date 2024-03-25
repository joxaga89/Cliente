import { Component, OnInit } from '@angular/core';
import { Cliente } from '../cliente/cliente.model';
import { ClienteApiService } from '../cliente/cliente-api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.css'
})
export class ClienteComponent {
  clientes: Cliente[] = [];
  clienteForm: FormGroup;
  displayedColumns = ['id', 'nombre', 'cedula', 'edad', 'telefono', 'correo', 'acciones'];
 
  constructor(private clienteService: ClienteApiService, private fb: FormBuilder) {
    this.clienteForm = this.fb.group({
      id: [''],
      nombre: ['', Validators.required],
      cedula: ['', Validators.required],
      edad: ['', Validators.required],
      telefono: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    this.listarClientes();
    console.log(this.clientes);
  }

  // Método para obtener el control del campo de email
  get email() {
    return this.clienteForm.get('correo');
  }

  listarClientes(): void {
    this.clienteService.listarClientes().subscribe(clientes => {
      this.clientes = clientes;
    });
  }

  seleccionarCliente(id: number): void {
    this.clienteService.getCliente(id).subscribe(cliente => {
      console.log('Seleccionar cliente:', cliente);
    });
  }

  guardarCliente(): void {
    const cliente: Cliente = this.clienteForm.value;
    this.clienteService.guardarCliente(cliente).subscribe(newCliente => {
      console.log('Cliente guardado:', newCliente);
      // Implementar lógica de guardado
      this.listarClientes(); // Actualizar lista después de guardar
    });
  }

  actualizarCliente(): void {
    const cliente: Cliente = this.clienteForm.value;
    this.clienteService.actualizarCliente(cliente).subscribe(updatedCliente => {
      console.log('Cliente actualizado:', updatedCliente);
      // Implementar lógica de actualización
      this.listarClientes(); // Actualizar lista después de actualizar
    });
  }

  eliminarCliente(id: number): void {
    this.clienteService.eliminarCliente(id).subscribe(() => {
      console.log('Cliente eliminado');
      // Implementar lógica de eliminación
      this.listarClientes(); // Actualizar lista después de eliminar
    });
  }

  onSeleccionarCliente(cliente: Cliente): void {
    this.clienteForm.patchValue(cliente);
  }
  // Método para manejar el envío del formulario
  onSubmit() {
    if (this.clienteForm.valid) {
      // Hacer algo cuando el formulario sea válido
      console.log('Formulario válido, datos:', this.clienteForm.value);
    } else {
      // Hacer algo cuando el formulario sea inválido
      console.log('Formulario inválido');
    }
  }
}
