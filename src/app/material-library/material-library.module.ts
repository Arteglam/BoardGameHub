import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatExpansionModule, MatExpansionPanel } from '@angular/material/expansion';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';

const materialModules = [
  MatButtonModule,
  MatInputModule,
  MatCardModule,
  MatFormFieldModule,
  MatToolbarModule,
  MatIconModule,
  MatDialogModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
  MatExpansionModule,
  MatExpansionPanel,
  MatSelectModule,
  MatOptionModule,
  MatPaginatorModule,
  MatIconModule
];

@NgModule({
  imports: [materialModules],
  exports: [materialModules]
})
export class MaterialLibraryModule { }
