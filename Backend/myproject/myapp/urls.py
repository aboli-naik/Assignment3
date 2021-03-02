from django.urls import path
from myapp import views,views_authentication


urlpatterns = [
    path('api/core/students/', views.students_list.as_view()),
    path('api/core/students/<int:pk>/', views.students_detail.as_view()),
    path('api/core/professor/', views.professors_list.as_view()),
    path('api/core/professor/<int:pk>/', views.professors_detail.as_view()),
    path('api/core/courses/', views.courses_list.as_view()),
    path('api/core/courses/<int:pk>/', views.courses_detail.as_view()),
    path('api/core/registration/', views.registration_list.as_view()),
    path('api/core/registration/<int:pk>/', views.registration_detail.as_view()),
    path('api/authentication/registration/', views_authentication.register),
    path('api/authentication/login/', views_authentication.login),
    path('api/core/user/', views.UserList.as_view()),
    path('api/core/user/<int:pk>/', views.UserDetail.as_view()),
] 

