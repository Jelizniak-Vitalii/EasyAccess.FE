import { FormControl, FormGroup, FormArray } from '@angular/forms';

export type FormType<T> = {
  [K in keyof T]: T[K] extends string | number | boolean
    ? FormControl<T[K] | null>
    : T[K] extends Array<infer U>
      ? FormArray<FormControl<U | null> | FormGroup<FormType<U>>>
      : FormGroup<FormType<T[K]>>;
};

export type FormTypeGroup<T> = FormGroup<FormType<T>>;
