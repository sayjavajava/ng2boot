import { FormBuilder } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  var component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  beforeEach(()=>{
    component = new LoginComponent(new FormBuilder());
     it('should be contain name ',()=>{
      
     expect( component.rForm.contains('name')).toBeTruthy();
    
     expect( component.rForm.contains('name')).toBeTruthy();
     
    })

     it('should be valid name ',()=>{
      let comp= component.rForm.get('name');
      comp.setValue('');
     expect(comp.valid).toBeFalsy();
     })
   })
   

});