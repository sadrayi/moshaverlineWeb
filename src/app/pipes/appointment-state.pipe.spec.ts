import { AppointmentStatePipe } from './appointment-state.pipe';

describe('AppointmentStatePipe', () => {
  it('create an instance', () => {
    const pipe = new AppointmentStatePipe();
    expect(pipe).toBeTruthy();
  });
});
