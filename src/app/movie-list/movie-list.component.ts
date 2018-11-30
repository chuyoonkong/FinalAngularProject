import { Component, OnInit } from '@angular/core';
import {PostService} from '../service/post.service';
import { Observable } from 'rxjs';
import {Post} from '../post.model';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  posts: any = [];

  constructor(private ps:PostService) { }

  ngOnInit() {

    this.ps.getPostsData().subscribe(data => {
      this.posts = data;
    });
  }

  onDelete(id:String){
    console.log("Delete called " + id);
    this.ps.deletePost(id).subscribe(() =>
    {
      this.ngOnInit();
    })
  }
}
