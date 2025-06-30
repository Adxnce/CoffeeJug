export class Usuario {
  id?: number; 
  firstname: string;
  lastname: string;
  password?: string; 
  username: string;
  fechaNacimiento?: string; 
  nivelEducacion?: string;

  constructor(
    firstname: string,
    lastname: string,
    username: string,
    password?: string,
    fechaNacimiento?: string,
    nivelEducacion?: string,
    id?: number
  ) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.username = username;
    this.password = password;
    this.fechaNacimiento = fechaNacimiento;
    this.nivelEducacion = nivelEducacion;
    this.id = id;
  }
}

