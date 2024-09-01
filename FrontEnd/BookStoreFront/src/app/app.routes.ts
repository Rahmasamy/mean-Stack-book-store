import { Routes } from '@angular/router';

import { LandingBageComponent } from './components/landing-bage/landing-bage.component';
import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './core/login/login.component';
import { RegisterComponent } from './core/register/register.component';
import { AdminComponent } from './components/admin/admin.component';
import { CategoryComponent } from './components/category/category.component';
import { AuthorComponent } from './components/author/author.component';
import { AdminbooksComponent } from './adminbooks/adminbooks.component';
import { authGuard } from './guard/auth.guard';
import { UserComponent } from './user/user.component';
import { UserAuthorsComponent } from './user-authors/user-authors.component';
import { UserCategoriesComponent } from './user-categories/user-categories.component';
import { CategoryDetailsComponent } from './category-details/category-details.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { AuthorDetailsComponent } from './author-details/author-details.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserAllComponent } from './user-all/user-all.component';
import { UserCurrentReadComponent } from './user-current-read/user-current-read.component';
import { UserWantToReadComponent } from './user-want-to-read/user-want-to-read.component';
import { UserReadComponent } from './user-read/user-read.component';
import { ShowBooksComponent } from './components/show-books/show-books.component';
import { AboutdetailsComponent } from './components/aboutdetails/aboutdetails.component';

export const routes: Routes = [
  { path: '', component: LandingBageComponent },
  { path: 'landing', component: LandingBageComponent }, // Default route
  { path: 'about', component: AboutComponent }, // Admin + user
  { path: 'login', component: LoginComponent }, // Adminn + user
  { path: 'register', component: RegisterComponent }, // admin + user
  {
    path: 'admin',
    component: AdminComponent, /// juset for admin
    children: [
      { path: '', component: CategoryComponent },
      { path: 'category', component: CategoryComponent },
      { path: 'adminbooks', component: AdminbooksComponent },
      { path: 'Authors', component: AuthorComponent },
    ],
  },
  { path: 'Users', component: UserComponent },
   { path: 'books', component: ShowBooksComponent },
   { path: 'aboutdetails', component: AboutdetailsComponent },
  { path: 'categoryDetails/:id', component: CategoryDetailsComponent },
  { path: 'bookDetails/:id', component: BookDetailsComponent },
  { path: 'authorDetails/:id', component: AuthorDetailsComponent }, // user
  { path: 'userAuthors', component: UserAuthorsComponent },
  { path: 'userCategories', component: UserCategoriesComponent },
  {
    path: 'userprofile',
    component: UserProfileComponent,
    children: [
      {
        path: '',
        redirectTo: 'all',
        pathMatch: 'full',
      },
      { path: 'all', component: UserAllComponent },
      { path: 'currentRead', component: UserCurrentReadComponent },
      { path: 'WantToRead', component: UserWantToReadComponent },
      { path: 'Read', component: UserReadComponent },
    ],
  },
];
