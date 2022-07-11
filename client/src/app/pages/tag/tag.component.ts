import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TagColorDto, TagCreateDto, TagDto } from '@app/core/dto';
import { TagService } from '@app/core/services';

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

  constructor(
    public tagService: TagService,
    public ref: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.tagService.getColor().subscribe(colors => {
      this.colors = colors;
      this.ref.markForCheck();
    });
    this.tagService.getAll().subscribe(tags => {
      this.tags = tags;
      this.ref.markForCheck();
    });
  }

  createTag() {
    this.tagService.create(this.tag).subscribe(tag=>{
      this.tags.unshift(tag);
      this.ref.markForCheck();
    });
  }
}
