export class Like {
  id?: number;
  usuario_id: number;
  jarra_id: number;

  constructor(
    usuario_id: number,
    jarra_id: number,
    id?: number
  ) {
    this.usuario_id = usuario_id;
    this.jarra_id = jarra_id;
    this.id = id;
  }
}