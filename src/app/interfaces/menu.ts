import { Component } from '@angular/core';

export interface Menu {
  value: any;
  icon: string;
  children?: {
    title: string;
    value: any;
  }[];
}
