import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent  {
  isBannerVisible = true;
  storedData: any;
  toggleBanner() {
    this.isBannerVisible = !this.isBannerVisible;
  }

  form: FormGroup;
  selectDataOption = [
    {
      id: 1,
      name: "Banner1",
      url: 'Banner1'
    },
    {
      id: 2,
      name: "Banner2",
      url: 'Banner2'
    },
  ]

  dataFromApiRes = [
    {
      id: 1,
      name: "Banner1",
      url: 'https://fastly.picsum.photos/id/20/3670/2462.jpg?hmac=CmQ0ln-k5ZqkdtLvVO23LjVAEabZQx2wOaT4pyeG10I'
    },
    {
      id: 2,
      name: "Banner2",
      url: 'https://fastly.picsum.photos/id/43/1280/831.jpg?hmac=glK-rQ0ppFClW-lvjk9FqEWKog07XkOxJf6Xg_cU9LI'
    },
    {
      id: 3,
      name: "Banner3",
      url: 'https://fastly.picsum.photos/id/13/2500/1667.jpg?hmac=SoX9UoHhN8HyklRA4A3vcCWJMVtiBXUg0W4ljWTor7s'
    },
  ]

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      items: this.formBuilder.array([])
    });
    localStorage.setItem('storeddata',JSON.stringify(this.dataFromApiRes))
    this.storedData = JSON.parse(localStorage.getItem('storeddata'))
    // this.items.get('bannerInfo')?.setValue(this.storedData[0])
    // this.items.push(this.formBuilder.group(this.storedData[0]))
    this.storedData.forEach(item => {
      this.items.push(this.formBuilder.control(item))
    });
    console.log('storedData',this.items);
  }

  get items() {
    return this.form.get('items') as FormArray;
  }
  
  setValues() {
    const newItemValues = { name: 'Item 1', quantity: 2 };
    this.items.push(this.formBuilder.control([...this.storedData]));
  }

  addItem() {
    this.items.push(new FormControl());
    console.log(this.items);
  }

  removeItem(index: number) {
    this.items.removeAt(index);
  }

  onSelectBanner($item) {
    console.log($item);
  }
}
