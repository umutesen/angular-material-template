import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetlistListComponent } from './setlist-list/setlist-list.component';
import { SetlistRoutingModule } from './setlist-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SetlistEditDialogComponent } from './setlist-edit-dialog/setlist-edit-dialog.component';
import { SetlistSongsListComponent } from './setlist-songs-list/setlist-songs-list.component';
import { LyricsModule } from '../lyrics/lyrics.module';



@NgModule({
    imports: [
        CommonModule,
        SetlistRoutingModule,
        LyricsModule,
        SharedModule,
        SetlistListComponent,
        SetlistEditDialogComponent,
        SetlistSongsListComponent
    ]
})
export class SetlistModule { }
