import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './admin.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } }
      ]
    });

    guard = TestBed.inject(AuthGuard);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow navigation when token is present', () => {
    spyOn(localStorage, 'getItem').and.returnValue('fake-token');
    expect(guard.canActivate()).toBeTrue();
  });

  it('should not allow navigation when token is not present', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    guard.canActivate();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
