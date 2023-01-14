import { NgModule } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
const martial = [
  MatExpansionModule,
  MatFormFieldModule
]

@NgModule({
  declarations: [],
  imports: [
    martial
  ],
  exports: [martial]

})
export class MatrialModule { }
