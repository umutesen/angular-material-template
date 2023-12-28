import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SongRoutingModule } from './songs-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SongListComponent } from './song-list/song-list.component';
import { SongEditDialogComponent } from './song-edit-dialog/song-edit-dialog.component';
import { SongImportComponent } from './song-import/song-import.component';

@NgModule({
    imports: [
        CommonModule,
        SongRoutingModule,
        SharedModule
    ],
    declarations: [
        SongListComponent,
        SongEditDialogComponent,
        SongImportComponent
    ]
})
export class SongsModule { }
