import { Usuario } from './usuario';

describe('Usuario', () => {
  it('should create an instance', () => {
    const usuarioMock = {
      id: 1,
      firstname: 'Test',
      lastname: 'User',
      email: 'usuario@duocuc.cl',
      password: '123456',
      fechaNacimiento: '1990-01-01',
      nivelEducacion: 'Licenciatura'
    }
    expect(usuarioMock).toBeTruthy();
  });
});
