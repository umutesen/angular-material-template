import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, RequiredValidator, Validators } from '@angular/forms';

import {ActivatedRoute, Router} from '@angular/router';
import { Song, SongHelper } from 'src/app/core/model/song';
import { SongService } from 'src/app/core/services/song.service';
import { FlexModule } from '@angular/flex-layout/flex';
import { MatButtonModule } from '@angular/material/button';
import { NgIf, NgFor, JsonPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { BaseUser, UserHelper } from 'src/app/core/model/user';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { tap } from 'rxjs';
import { SongAttribute } from 'src/app/core/viewModel/song-attribute';

@Component({
    selector: 'app-song-import',
    templateUrl: './song-import.component.html',
    styleUrls: ['song-import.component.css'],
    standalone: true,
    imports: [MatCardModule, FormsModule, ReactiveFormsModule, NgIf, MatButtonModule, FlexModule, NgFor, MatSelectModule, MatOptionModule, JsonPipe]
})
export class SongImportComponent implements OnInit {
  public stepNumber = 1;
  currentUser: BaseUser;
  public importSongsResult = '';
  public songsToImport = '';
  public categories: any[] = [];
  public accountId: string;
  private delimiter: string;
  private songLines: string[];
  public songFieldTypes: SongAttribute[] = [{displayName: 'Name', attribute: 'name'}, 
                                            {displayName:'Artist', attribute: 'artist'}, 
                                            {displayName: 'Genre', attribute: 'genre'}, 
                                            {displayName: 'Song Key', attribute: 'key'}, 
                                            {displayName: 'Song Length', attribute: 'songLength'}, 
                                            {displayName: 'Tempo', attribute: 'tempo'}, 
                                            {displayName: 'Notes', attribute: 'notes'}, 
                                            {displayName: 'Other', attribute: 'other'}];
  public multiSongForm: FormGroup;
  public songAttributeForm: FormGroup;
  
  constructor(
    private route: ActivatedRoute,
    private songService: SongService,
    private authService: AuthenticationService,
    private router: Router) {

      this.accountId = this.route.snapshot.paramMap.get('accountid') ?? "";
      
      this.multiSongForm = new FormGroup({
        importText: new FormControl(),
      });

      this.authService.user$.subscribe((user) => {
        if (user && user.uid) {
          this.currentUser = UserHelper.getForUpdate(user);
        }
      });

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.accountId = params['accountid'];
    });
  }

  static hmsToSecondsOnly(str) {
    let p = str.split(':'), s = 0, m = 1;

    while (p.length > 0) {
      s += m * parseInt(p.pop(), 10);
      m *= 60;
    }

    return s;
  }

  stepOneImport() {
    const csvText: String = this.multiSongForm.get('importText')?.value;
    if(csvText){
      this.songLines = csvText.split('\n');

      if(this.songLines.length > 0) {
        if (this.songLines[0].indexOf(',') > -1) {
          this.delimiter = ',';
        } else if (this.songLines[0].indexOf('\t') > -1) {
          this.delimiter = '\t';
        }
        this.populateCategories(this.songLines, this.delimiter);
        this.stepNumber = 2;

        this.songAttributeForm = new FormGroup({});
        
        let group={}    
        this.categories.forEach(category=>
          this.songAttributeForm.addControl(category.type.attribute, new FormControl('', Validators.required))    
        );
      }
    }
  }

  stepTwoStartImport() {
    this.stepNumber = 3;
    this.importSongs();
  }

  stepThreeFinish() {
    this.router.navigate(['songs' ]);
  }

  async importSongs() {
    for (let i = 0; i < this.songLines.length ; i++) {

      const songItems = this.songLines[i].split(this.delimiter);

      this.createSongFromLine(songItems)
        .pipe(tap(updatedSong => console.log(`update song ${updatedSong}`)))
        .subscribe(updatedSong => {
          this.importSongsResult += `Finished creating ${updatedSong.name}\r\n`;
        });
    }
  }

  createSongFromLine(songLineArray) {
    const song = {} as Song;
    let index = 0;
    for(const field in this.songAttributeForm.controls) {
      const control = this.songAttributeForm.get(field);
      if (control?.value === 'length') {
        const p = songLineArray[index].split(':');
        let s = 0, m = 1;

        while (p.length > 0) {
          s += m * parseInt(p.pop(), 10);
          m *= 60;
        }
        song[control?.value] = s;
      } else {
        song[control?.value] = songLineArray[index];
      }
      index++;
    }

    this.importSongsResult += `Importing ${song.name}\r\n`;
    return this.songService.addSong(this.accountId, song, this.currentUser);
  }

  populateCategories(songLines, delimiter) {
    if (songLines.length > 0) {
      //Collect 3 items to display
      for (let i = 0; i < (i === 3 || songLines.length) ; i++) {
        const songItems = songLines[i].split(delimiter);
        this.createSongCategories(songItems);
      }
    }
  }



  createSongCategories(songItems) {
      for (let i = 0; i < songItems.length; i++) {
        //If the categories are already created add to the items array
        if(this.categories.length > i) {
          this.categories[i].items.push(songItems[i]);
        }
        else{
          //create the category and push the first item
          let fieldType = this.songFieldTypes[i];
          if (songItems[i].indexOf(':') > -1) {//Assign length to the field type
            const foundFieldType = this.songFieldTypes.find((SongAttribute) => SongAttribute.attribute === 'songLength');
            fieldType = foundFieldType || {displayName: 'Song Length', attribute: 'songLength'};
          }
          if (!fieldType) {
            fieldType = this.songFieldTypes[i];
          }

          this.categories.push({
            type: fieldType,
            items: [songItems[i]]//Add the first item in the array
          });
        }
      }
  }
}
