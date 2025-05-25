import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { EducationComponent } from './education.component';
import { EducationService } from '../../../services/education/education.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('EducationComponent', () => {
  let component: EducationComponent;
  let fixture: ComponentFixture<EducationComponent>;
  let educationService: jasmine.SpyObj<EducationService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('EducationService', ['getEducation', 'createEducation', 'updateEducation', 'deleteEducation']);
    spy.getEducation.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        EducationComponent
      ],
      providers: [
        { provide: EducationService, useValue: spy }
      ]
    }).compileComponents();

    educationService = TestBed.inject(EducationService) as jasmine.SpyObj<EducationService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    expect(component.educationForm.get('institucion')).toBeTruthy();
    expect(component.educationForm.get('titulo')).toBeTruthy();
    expect(component.educationForm.get('descripcion')).toBeTruthy();
    expect(component.educationForm.get('inicio')).toBeTruthy();
    expect(component.educationForm.get('fin')).toBeTruthy();
  });

  it('should load education on init', () => {
    component.ngOnInit();
    expect(educationService.getEducation).toHaveBeenCalled();
  });

  it('should reset form when resetForm is called', () => {
    component.resetForm();
    expect(component.editingId).toBeNull();
    expect(component.selectedFile).toBeNull();
    expect(component.educationForm.pristine).toBeTrue();
  });
});