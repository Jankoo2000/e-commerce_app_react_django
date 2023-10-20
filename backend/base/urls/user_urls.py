from django.urls import path
from base.views import user_views as views

urlpatterns = [
    # that could be int:pk instead str:pk because im always passing int
    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),  # we use access token to authorize

    path('register/', views.register_user, name='register_user'),

    path('', views.get_users, name='get_users'),
    path('<int:pk>/', views.get_user_by_id, name='get_user_by_id'),

    path('profile/', views.get_user_profile, name='get_user_profile'),
    path('profile/update/', views.update_user_profile, name='update_user_profile'),

    path('update/<str:pk>/', views.update_user, name='update_user'),

    path('delete/<str:pk>/', views.delete_user, name='delete_user'),

]
