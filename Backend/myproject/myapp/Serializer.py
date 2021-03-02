from rest_framework import serializers 
from myapp.models import students,courses,registration,professor
from django.contrib.auth.models import User
from rest_framework.authtoken.views import Token

class UserSerializer(serializers.ModelSerializer):
    #coursename = serializers.PrimaryKeyRelatedField(many=True, queryset=courses.objects.all())
    class Meta:
        model = User
        fields = ['id','password','username']

        extra_kwargs = {'password':{
            'write_only':True,
            'required':True
        }} 

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        Token.objects.create(user=user)
        return user

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = students
        fields = ['id','name', 'email', 'coursename', 'birthdate']

class CoursesSerializer(serializers.ModelSerializer):
    class Meta:
        model = courses
        fields = ['id', 'coursename', 'coursedescription']

class ProfessorSerializer(serializers.ModelSerializer):
    class Meta:
        model = professor
        fields = ['id','coursename', 'name','email']

class RegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = registration
        fields = ['id','coursename', 'studentname']
