import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService} from '../apiservice.service';
import { ActivatedRoute } from '@angular/router';
import { identifierName } from '@angular/compiler';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private service:ApiserviceService,private router:ActivatedRoute) {  }

  errormsg:any;
  successmsg:any;
  getparamid:any;

  ngOnInit(): void {
    this.getparamid= this.router.snapshot.paramMap.get('id');
    if(this.getparamid)
    {
      this.service.getSingleData(this.getparamid).subscribe((res)=>{
        console.log(res,'res==>');
        this.userForm.patchValue({
          name:res.data[0].name,
          email:res.data[0].email,
          phoneNumber:res.data[0].phoneNumber,
          address:res.data[0].address,
          gender:res.data[0].gender
        });
      });
    }
  }

  userForm = new FormGroup({
    'name':new FormControl('',Validators.required),
    'email':new FormControl('',Validators.required),
    'phoneNumber':new FormControl('',Validators.required),
    'address':new FormControl('',Validators.required),
    'gender':new FormControl('',Validators.required)
  });

  //createnewuser
  userSubmit()
  {
    if(this.userForm.valid)
    {
      console.log(this.userForm.value)
      this.service.createData(this.userForm.value).subscribe((res)=>{
          console.log(res,'res==>');
          this.userForm.reset();
          this.successmsg = res.message;
      });
    }
    else{
      this.errormsg = 'all field required !';
    }
  }

  //updatedata
  userUpdate()
  {
    console.log(this.userForm.value,'updateform');

    if(this.userForm.valid)
    {
      this.service.updateData(this.userForm.value,this.getparamid).subscribe((res)=>{
        console.log(res,'resupdated');
        this.successmsg = res.message;
      });
    }else
    {
        this.errormsg = 'all field is updpated';
    }
  }

}
