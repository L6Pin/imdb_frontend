import { TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ApiService } from './api.service'
import { of } from 'rxjs';
import { MockBuilder } from 'ng-mocks';

describe('ApiService', () => {
let service: ApiService;
const http = jest.fn();
const formData = {
	email: 'admin@gmail.com',
	password: 'Admin123@'
};
const response = {
	token: '',
};
const httpMock = {
	post: jest.fn().mockReturnValue(of(response))
};
const serviceMock = new ApiService(httpMock as any);

const res = {
	message: ''
};
const httpMockSecond = {
	post: jest.fn().mockReturnValue(of(res))
};
const serviceMockSecond = new ApiService(httpMockSecond as any);

    beforeEach(() => {
        service = new ApiService(http as any);
        window.localStorage.clear();
    });

  beforeEach(waitForAsync(() => {

    const mockModule = MockBuilder(ApiService)
      .keep(RouterTestingModule.withRoutes([]))
      .build();
    mockModule.schemas = [CUSTOM_ELEMENTS_SCHEMA];
    
    TestBed.configureTestingModule(mockModule);
   
  }));
	it('should compile', () => {
		expect(service).toBeTruthy();
	  });

    describe('Test: login', () => {
		it('it should return token', done => {
			serviceMock.login(formData).subscribe((data) => {
				expect(httpMock.post).toBeDefined();
				expect(httpMock.post).toHaveBeenCalled();
				expect(data).toEqual(response);

                window.localStorage.setItem('token', JSON.stringify(response.token));
				expect(window.localStorage.getItem('token')).not.toBeNull();
				done();
			});
		});
	});

    describe('Test: register', () => {
		it('it should return message', done => {
			serviceMockSecond.register(formData).subscribe((data) => {
				expect(httpMockSecond.post).toBeDefined();
				expect(httpMockSecond.post).toHaveBeenCalled();
				expect(data).toEqual(res);
				done();
			});
		});
	});
});