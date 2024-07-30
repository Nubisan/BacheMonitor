import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuOperatorComponent } from './menu-operator.component';

describe('MenuOperatorComponent', () => {
  let component: MenuOperatorComponent;
  let fixture: ComponentFixture<MenuOperatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuOperatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuOperatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
