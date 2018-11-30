import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../post.model';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  getPostsData(): Observable<any> {
  return this.http.get("http://localhost:8081/api/posts");
  }

  addPosts(movieTitle: string, movieGenre: string, movieDirector: string,  movieProducer: string): Observable<any> {
    const post: Post = {movieTitle: movieTitle, movieGenre: movieGenre, movieDirector: movieDirector,  movieProducer: movieProducer};
    return this.http.post("http://localhost:8081/api/posts",post);
  }

  deletePost(id: String): Observable<any>{
    return this.http.delete("http://localhost:8081/api/posts/"+id);
  }

  getPost(id:String): Observable<any> {
    return this.http.get("http://localhost:8081/api/posts/"+id);
  }

  updatePost(id:String, movieTitle: string, movieGenre: string, movieDirector: string,  movieProducer: string): Observable<any> {
    const post: Post = {movieTitle: movieTitle, movieGenre: movieGenre, movieDirector: movieDirector,  movieProducer: movieProducer};
  return this.http.put("http://localhost:8081/api/posts/"+id, post);
  }
}
