import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TagColorDto, TagCreateDto, TagDto } from '@app/core/dto';
import { TagService } from '@app/core/services';
import { catchError } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagComponent implements OnInit {

  tags: TagDto[] = [];
  colors: TagColorDto[] = [];

  form = this.fb.group({
    title: ['', Validators.required],
    color: 0
  });

  constructor(
    public fb: FormBuilder,
    public tagService: TagService,
    public ref: ChangeDetectorRef,
  ) {
  }

  ngOnInit(): void {
    this.tagService.getColor()
      .subscribe(colors => {
        this.colors = colors;
        this.ref.markForCheck();
      });

    this.tagService.getAll()
      .subscribe(tags => {
        this.tags = tags;
        this.ref.markForCheck();
      });
  }

  createTag() {
    if (this.form.invalid) {
      return;
    }

    const dto = this.form.value as TagCreateDto;
    this.tagService.create(dto)
      .pipe(catchError((err) => {
        this.handleError(err);
        throw new Error(err);
      }))
      .subscribe(tag => {
        this.tags.unshift(tag);
        this.ref.markForCheck();
      });
  }

  onChangeColor(tag: TagDto) {
    const id = tag.color.id;
    const color = this.colors.find(c => c.id === id);
    if (color) {
      tag.color = {...color};
    }
    this.ref.markForCheck();
  }

  onUpdateTag(tag: TagDto) {
    const dto: TagCreateDto = {title: tag.title, color: tag.color.id};
    this.tagService.update(tag.id, dto)
      .pipe(catchError((err) => {
        this.handleError(err);
        throw new Error(err);
      }))
      .subscribe();
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
}
