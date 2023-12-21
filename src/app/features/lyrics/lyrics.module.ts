import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LyricsRoutingModule } from './lyrics-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { LyricsComponent } from './lyrics-view/lyrics.component';
import { LyricsEditComponent } from './lyrics-edit/lyrics-edit.component';
import { LyricAddDialogComponent } from './lyric-add-dialog/lyric-add-dialog.component';

@NgModule({
    imports: [
        CommonModule,
        LyricsRoutingModule,
        SharedModule
    ],
    declarations: [
        LyricsComponent,
        LyricsEditComponent,
        LyricAddDialogComponent
    ]
})
export class LyricsModule { }
