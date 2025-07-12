import { Like } from './like';

describe('Like', () => {
  it('should create an instance', () => {
    const likeMock = {
      id: 1,
      usuario_id: 1,
      jarra_id: 1
    }
    expect(likeMock).toBeTruthy();
  });
});
