import { NgModule } from '@angular/core';
import { FilterCompletedPipe } from './filter-completed.pipe';

@NgModule({
  declarations: [FilterCompletedPipe],
  exports: [FilterCompletedPipe],
  imports: [],
})
export class PipesModule {}
