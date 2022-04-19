import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(AuthService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return some data', (done: DoneFn) => {
    const expectedResult = {
      token: 'Bearer token',
      expiresIn: '30m',
      fullName: 'Name Surname',
    };

    service.login('email', 'password').subscribe({
      next: (result) => {
        expect(result).toEqual(expectedResult);
        done();
      },
    });

    const req = httpController.expectOne({
      method: 'POST',
      url: 'http://localhost:3000/auth/login',
    });

    req.flush(expectedResult);
  });

  it('should call setSession on success', (done: DoneFn) => {
    spyOn(service as any, 'setSession');

    const expectedResult = {
      token: 'Bearer token',
      expiresIn: '30m',
      fullName: 'Name Surname',
    };

    service.login('email', 'password').subscribe(() => {
      expect((service as any).setSession).toHaveBeenCalledOnceWith(
        expectedResult
      );
      done();
    });

    const req = httpController.expectOne({
      method: 'POST',
      url: 'http://localhost:3000/auth/login',
    });

    req.flush(expectedResult);
  });

  it('should not call setSession on error', (done: DoneFn) => {
    spyOn(service as any, 'setSession');

    service.login('email', 'password').subscribe({
      error: () => {
        expect((service as any).setSession).not.toHaveBeenCalled();
        done();
      },
    });

    const req = httpController.expectOne({
      method: 'POST',
      url: 'http://localhost:3000/auth/login',
    });

    req.error(new ProgressEvent('401'));
  });
});
