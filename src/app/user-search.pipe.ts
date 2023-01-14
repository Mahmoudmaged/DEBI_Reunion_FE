import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userSearch'
})
export class UserSearchPipe implements PipeTransform {

  transform(dataContainer: any, term: any): any {
    if (term == undefined || term == '') {
      return dataContainer
    } else {

      return dataContainer.filter(function (dataContainer: any) {
        return dataContainer.userName.toLowerCase().includes(term.toLowerCase())
      })
    }
  }

}
