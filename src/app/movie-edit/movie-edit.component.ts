import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterModule, Routes, Router } from '@angular/router';
import {PostService} from '../service/post.service';
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrls: ['./movie-edit.component.css']
})
export class MovieEditComponent implements OnInit {

  post: any = [];
  myMovieTitle: String;
  myMovieGenre: String;
  myMovieDirector: String;
  myMovieProducer: String;

  constructor(private router:Router, private route: ActivatedRoute, private service:PostService) { }

  ngOnInit() {
    console.log(this.route.snapshot.params['id']);
    this.service.getPost(this.route.snapshot.params['id']).subscribe(data =>
    {
      this.post = data;
      console.log(this.post);
      this.myMovieTitle = this.post.myMovieTitle;
      console.log("message" +this.myMovieTitle);

    });
  }
  onEditPost(form: NgForm) {
    this.service.updatePost(this.post._id, form.value.movieTitle, form.value.movieGenre, form.value.movieDirector, form.value.movieProducer).subscribe(() =>
    {
      this.router.navigate(['/list']);
    });
  }
}
