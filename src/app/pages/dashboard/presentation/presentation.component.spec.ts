import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PresentationComponent } from './presentation.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PresentationService } from '../../../services/presentation/presentation.service';
import { of, throwError } from 'rxjs';
import { CommonModule } from '@angular/common';

describe('PresentationComponent', () => {
  let component: PresentationComponent;
  let fixture: ComponentFixture<PresentationComponent>;
  let presentationService: jasmine.SpyObj<PresentationService>;

  const mockPresentation = {
    nombre: 'Test Name',
    titulo: 'Test Title',
    descripcion: 'Test Description',
    linkLinkedin: 'https://linkedin.com/test',
    linkGithub: 'https://github.com/test',
    linkCv: 'https://test.com/cv',
    foto: 'https://test.com/image.jpg'
  };

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('PresentationService', ['getPresentation', 'updatePresentation']);
    spy.getPresentation.and.returnValue(of(mockPresentation));

    await TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule],
      declarations: [],
      providers: [
        FormBuilder,
        { provide: PresentationService, useValue: spy }
      ]
    }).compileComponents();

    presentationService = TestBed.inject(PresentationService) as jasmine.SpyObj<PresentationService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with validators', () => {
    expect(component.presentationForm.get('nombre')?.hasValidator(Validators.required)).toBeTruthy();
    expect(component.presentationForm.get('nombre')?.hasValidator(Validators.minLength(3))).toBeTruthy();
    expect(component.presentationForm.get('descripcion')?.hasValidator(Validators.required)).toBeTruthy();
    expect(component.presentationForm.get('descripcion')?.hasValidator(Validators.minLength(10))).toBeTruthy();
  });

  it('should load presentation data on init', () => {
    component.ngOnInit();
    expect(presentationService.getPresentation).toHaveBeenCalled();
    expect(component.presentationForm.value).toEqual(mockPresentation);
  });

  it('should handle error when loading presentation', () => {
    presentationService.getPresentation.and.returnValue(throwError(() => new Error('Error')));
    spyOn(console, 'error');
    component.ngOnInit();
    expect(console.error).toHaveBeenCalled();
  });

  it('should update presentation when form is valid', () => {
    presentationService.updatePresentation.and.returnValue(of(mockPresentation));
    component.presentationForm.patchValue(mockPresentation);
    component.onSubmit();
    expect(presentationService.updatePresentation).toHaveBeenCalledWith(1, jasmine.any(FormData));
  });

  it('should not update presentation when form is invalid', () => {
    component.presentationForm.patchValue({
      nombre: '', // required field empty
      titulo: 'Test Title',
      descripcion: 'Test Description',
      linkLinkedin: 'https://linkedin.com/test',
      linkGithub: 'https://github.com/test',
      linkCv: 'https://test.com/cv',
      foto: 'https://test.com/image.jpg'
    });
    component.onSubmit();
    expect(presentationService.updatePresentation).not.toHaveBeenCalled();
  });
});