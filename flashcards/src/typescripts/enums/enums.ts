export enum ApiRequest {
  Get = 'GET',
  Post = 'POST',
  Delete = 'DELETE',
  Patch = 'PATCH',
}

export enum Path {
  Flashcards = '/flashcards',
  Card = '/card',
  User = '/user',
  Home = 'home.html',
  Root = '/',
  Login = '/index.html',
}

export enum DataSources {
  User = 'user',
  Card = 'card',
  Flashcards = 'flashcards',
}

export enum FieldNames {
  Email = 'email',
  Password = 'password',
}

export enum HTMLAttribute {
  DataID = 'data-id',
  Type = 'type',
  Item = 'item',
  IsEdit = 'isEdit',
  IsSearch = 'isSearch',
}

export enum Status {
  Active = 'active',
  Inactive = 'inactive',
  Open = 'open',
  Error = 'error',
  On = 'on',
}

export enum RequestState {
  Success = 'success',
  Failed = 'failed',
}

export enum Action {
  Update = 'Update',
  Create = 'Create',
  Previous = 'prev-slide',
}

export enum KeyMap {
  Escape = 'Escape',
  Enter = 'Enter',
}
