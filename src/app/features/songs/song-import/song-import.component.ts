import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import {ActivatedRoute, Router} from '@angular/router';
import { SongHelper } from 'src/app/core/model/song';
import { SongService } from 'src/app/core/services/song.service';
import { FlexModule } from '@angular/flex-layout/flex';
import { MatButtonModule } from '@angular/material/button';
import { NgIf, NgFor } from '@angular/common';
import { MatCardModule } from '@angular/material/card';


declare var _: any;

@Component({
    selector: 'app-song-import',
    templateUrl: './song-import.component.html',
    styleUrls: ['song-import.component.css'],
    standalone: true,
    imports: [MatCardModule, FormsModule, ReactiveFormsModule, NgIf, MatButtonModule, FlexModule, NgFor]
})
export class SongImportComponent implements OnInit {
  public stepNumber = 1;
  public importSongsResult = '';
  public songsToImport = '';
  public categories: any[] = [];
  public accountId: string;
  private delimiter: string;
  private songLines: string[];
  public songFieldTypes: string[] = ['Name', 'ArtistName', 'GenreName', 'SongKey', 'Length', 'Tempo', 'Notes', 'Other'];
  public multiSongForm: FormGroup;
  
  constructor(
    private route: ActivatedRoute,
    private songService: SongService,
    private router: Router) {

      this.multiSongForm = new FormGroup({
        importText: new FormControl(),
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
      //   .do(updatedSong => console.log(`update song ${updatedSong}`))
      //   .subscribe(updatedSong => {
      //     this.importSongsResult += `Finished creating ${updatedSong.song.Name}\r\n`;
      //   });
    }
  }

  createSongFromLine(songLineArray) {
    const song = {};
    _.each(this.categories, function(category, index) {
      if (category.type === 'length') {
        const p = songLineArray[index].split(':');
        let s = 0, m = 1;

        while (p.length > 0) {
          s += m * parseInt(p.pop(), 10);
          m *= 60;
        }
        song[category.type] = s;
      } else {
        song[category.type] = songLineArray[index];
      }
    });
    //this.importSongsResult += `Importing ${song.Name}\r\n`;
    //return this.songService.createSong(song).do(updatedSong => console.log(`update song ${updatedSong}`));
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
            fieldType = _.find(this.songFieldTypes, function(type) {
              return type === 'length';
            });
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
