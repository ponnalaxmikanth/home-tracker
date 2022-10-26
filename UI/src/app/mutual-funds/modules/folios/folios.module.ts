import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { SidebarModule } from 'primeng/sidebar';
import { TableModule } from 'primeng/table';

import { FoliosRoutingModule } from './folios-routing.module';
import { FoliosComponent } from './folios.component';

@NgModule({
  declarations: [
    FoliosComponent
  ],
  imports: [
    CommonModule,
    FoliosRoutingModule,
    ReactiveFormsModule,
    TableModule,
    SidebarModule,
    DropdownModule,
    CalendarModule,
    InputTextModule,
    ButtonModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: "en-IN" }],
})
export class FoliosModule { }
