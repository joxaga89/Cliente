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

  constructor(private clienteService: ClienteApiService, private fb: FormBuilder) {
    this.clienteForm = this.fb.group({
      id: [],
      nombre: ['', Validators.required],
      cedula: ['', Validators.required],
      edad: ['', Validators.required],
      telefono: ['', Validators.required],
      correo: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.listarClientes();
    console.log(this.clientes);
  }

  listarClientes(): void {
    this.clienteService.listarClientes().subscribe(clientes => {
      this.clientes = clientes;
    });
  }

  consultarCliente(id: number): void {
    this.clienteService.getCliente(id).subscribe(cliente => {
      console.log('Consultar cliente:', cliente);
      // Implementar lógica de consulta
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
}
