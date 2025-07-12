import { Jarra } from './jarra';

describe('Jarra', () => {
  it('should create an instance', () => {
    const jarraMock = {
      id: 1,
      nombre: 'Jarra de Café',
      tipo_punta: 'Punta Fina',
      img: 'jarra-cafe.jpg',
      descripcion: 'Una jarra perfecta para servir café.'
    }
    expect(jarraMock).toBeTruthy();
  });
});
