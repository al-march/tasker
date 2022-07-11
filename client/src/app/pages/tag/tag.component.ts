import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TagColorDto, TagCreateDto, TagDto } from '@app/core/dto';
import { TagService } from '@app/core/services';
import { catchError } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagComponent implements OnInit {
  tag: TagCreateDto = {
    title: '',
    color: 0
  };
  tags: TagDto[] = [];
  colors: TagColorDto[] = [];
  addTagControl =  new FormControl('', [Validators.required])
  constructor(
    public tagService: TagService,
    public ref: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.tagService.getColor()
      .pipe(catchError((err) => {
        this.handleError(err);
        throw new Error(err);
      }))
      .subscribe(colors => {
        this.colors = colors;
        this.ref.markForCheck();
      });
    this.tagService.getAll().subscribe(tags => {
      this.tags = tags;
      this.ref.markForCheck();
    });
  }

  handleError(err: any) {
    const status = err.status as number;

    switch (status) {
      case 404:
      case 400:
        const error: { message: string } = err.error;
        alert(error.message);
        break;
      default:
        alert('Что-то пошло не так');
    }
  }

  createTag() {
    this.tagService.create(this.tag).subscribe(tag => {
      this.tags.unshift(tag);
      this.ref.markForCheck();
    });
  }
}
