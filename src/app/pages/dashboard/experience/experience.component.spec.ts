import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExperienceComponent } from './experience.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ExperienceService } from '../../../services/experience/experience.service';
import { of, throwError } from 'rxjs';
import { CommonModule } from '@angular/common';

describe('ExperienceComponent', () => {
  let component: ExperienceComponent;
  let fixture: ComponentFixture<ExperienceComponent>;
  let experienceService: jasmine.SpyObj<ExperienceService>;

  const mockExperiences = [
    {
      id: 1,
      empresa: 'Empresa Test',
      puesto: 'Desarrollador',
      descripcion: 'Descripción test',
      fechaInicio: '2023-01-01',
      fechaFin: '2023-12-31',
      foto: 'test.jpg'
    }
  ];

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('ExperienceService', ['getExperiences', 'createExperience', 'updateExperience', 'deleteExperience']);
    spy.getExperiences.and.returnValue(of(mockExperiences));

    await TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule],
      declarations: [],
      providers: [
        FormBuilder,
        { provide: ExperienceService, useValue: spy }
      ]
    }).compileComponents();

    experienceService = TestBed.inject(ExperienceService) as jasmine.SpyObj<ExperienceService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    expect(component.experienceForm.get('empresa')).toBeTruthy();
    expect(component.experienceForm.get('puesto')).toBeTruthy();
    expect(component.experienceForm.get('descripcion')).toBeTruthy();
    expect(component.experienceForm.get('fechaInicio')).toBeTruthy();
    expect(component.experienceForm.get('fechaFin')).toBeTruthy();
  });

  it('should load experiences on init', () => {
    component.ngOnInit();
    expect(experienceService.getExperiences).toHaveBeenCalled();
    expect(component.experiences).toEqual(mockExperiences);
  });

  it('should handle error when loading experiences', () => {
    experienceService.getExperiences.and.returnValue(throwError(() => new Error('Error')));
    spyOn(console, 'error');
    component.ngOnInit();
    expect(console.error).toHaveBeenCalled();
  });

  it('should reset form', () => {
    component.experienceForm.patchValue({
      empresa: 'Test',
      puesto: 'Test',
      descripcion: 'Test',
      fechaInicio: '2023-01-01',
      fechaFin: '2023-12-31'
    });
    component.editingId = 1;
    component.selectedFile = new File([], 'test.jpg');

    component.resetForm();

    expect(component.editingId).toBeNull();
    expect(component.selectedFile).toBeNull();
    expect(component.experienceForm.value).toEqual({
      empresa: null,
      puesto: null,
      descripcion: null,
      fechaInicio: null,
      fechaFin: null
    });
  });
});