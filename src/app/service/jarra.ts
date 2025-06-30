export class Jarra {
  id?: number;
  nombre: string;
  tipo_punta: string;
  img: string;
  descripcion: string;

  constructor(
    nombre: string,
    tipo_punta: string,
    img: string,
    descripcion: string,
    id?: number
  ) {
    this.nombre = nombre;
    this.tipo_punta = tipo_punta;
    this.img = img;
    this.descripcion = descripcion;
    this.id = id;
  }
}