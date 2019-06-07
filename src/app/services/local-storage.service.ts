import {Inject, Injectable} from '@angular/core';
import {LOCAL_STORAGE, SESSION_STORAGE, StorageService} from 'ngx-webstorage-service';

const Category_Key = 'CategorySelected';
const searchedDoctor_Key = 'searchedDoctor';

// key that is used to access the data in local storageconst STORAGE_KEY = 'local_todolist';
@Injectable()
export class LocalStorageService {
  anotherTodolist = [];

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) {
  }

  public saveCategory(categoryId: string): void {

    // get array of tasks from local storage
    this.storage.set(Category_Key, categoryId);
  }

  public getdoctorSearchName(): string {
    return this.storage.get(searchedDoctor_Key)
  }
  public getCategorySelectedId(): string {
    return this.storage.get(Category_Key)
  }

  public saveSearchedDoctorName(doctorName: string): void {

    // get array of tasks from local storage
    this.storage.set(searchedDoctor_Key, doctorName);
  }
}
