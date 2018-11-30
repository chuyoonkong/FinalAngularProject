import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { PostService } from '../service/post.service';

@Component({
  selector: 'app-movie-create',
  templateUrl: './movie-create.component.html',
  styleUrls: ['./movie-create.component.css']
})
export class MovieCreateComponent implements OnInit {

  constructor(private service:PostService) { }

  onAddPost(form: NgForm){
    this.service.addPosts(form.value.movieTitle, form.value.movieGenre, form.value.movieDirector, form.value.movieProducer, ).subscribe();

    console.log(form.value);
    form.resetForm();
  }

  ngOnInit() {
  }

}
