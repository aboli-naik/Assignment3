from django.shortcuts import render
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework import status
from rest_framework.decorators import api_view

import json
from myapp.models import professor,students
from myapp.Serializer import ProfessorSerializer,StudentSerializer

@api_view(['POST'])
def register(request):
	if request.method == 'POST':
		new_user_data = JSONParser().parse(request)
		user_email = new_user_data['email']
		user_role = new_user_data['role']
		if user_email is not None and user_role is not None:	
			Student = students.objects.all()
			Student = Student.filter(email__icontains=user_email) 		
			Professor = professor.objects.all()				
			Professor = Professor.filter(email__icontains=user_email) 
			if(len(Student) == 0 and len(Professor) == 0):
				if (user_role == "student" or user_role == "professor"):
					# TODO - password hashing
					serializer = None
					if user_role == "student":
						serializer = StudentSerializer(data=new_user_data)
					if user_role == "professor":
						# TODO - handle expertise details
						serializer = ProfessorSerializer(data=new_user_data)
					if serializer.is_valid():
						serializer.save()
						return JsonResponse(serializer.data, status=status.HTTP_201_CREATED) 
					return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
				else:
					return JsonResponse({'message': 'Role Not supported!'}, status=status.HTTP_204_NO_CONTENT)       	
			else:
				return JsonResponse({'message': 'User already exists!'}, status=status.HTTP_204_NO_CONTENT)       
		else:
			return JsonResponse({'message': 'Check the registration details again!'}, status=status.HTTP_204_NO_CONTENT) 

@api_view(['GET'])
def login(request):
	if request.method == 'GET':
		user_data = JSONParser().parse(request)
		user_email = user_data['email']
		user_password = user_data['password']
		user_role = user_data['role']
		print(user_email, user_password, user_role)
		if user_email is not None and user_role is not None and user_password is not None:	
			# TODO - password hashing
			Student = students.objects.all()
			Student = Student.filter(email__icontains=user_email) 	
			Student = Student.filter(password__icontains=user_password) 	
			Professor = professor.objects.all()				
			Professor = Professor.filter(email__icontains=user_email) 
			Professor = Professor.filter(password__icontains=user_password) 
			if(len(Student) != 0 or len(Professor) != 0):
				if (user_role == "student" or user_role == "professor"):
					if user_role == "student":
						serializer = StudentSerializer(Student, many=True)
					if user_role == "professor":
						serializer = ProfessorSerializer(Professor, many=True)
					return JsonResponse(serializer.data, safe=False)
				else:
					return JsonResponse({'message': 'Role Not supported!'}, status=status.HTTP_204_NO_CONTENT)       	
			else:
				return JsonResponse({'message': 'Check the login details again!'}, status=status.HTTP_204_NO_CONTENT)       
		else:
			return JsonResponse({'message': 'Check the login details again!'}, status=status.HTTP_204_NO_CONTENT)  
