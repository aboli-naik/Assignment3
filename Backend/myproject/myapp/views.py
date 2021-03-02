from django.shortcuts import render

from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from myapp.models import students,professor,registration,courses
from myapp.Serializer import CoursesSerializer,StudentSerializer,ProfessorSerializer,RegistrationSerializer
import requests
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics
from django.contrib.auth.models import User
from myapp.Serializer import UserSerializer
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated


class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

def index(request):
    return render(request,'index.html')

def signin(request):
    return render(request,'signin.html')

class students_list(generics.ListCreateAPIView):
    queryset = students.objects.all()
    serializer_class = StudentSerializer
  #  permission_classes = [IsAuthenticated]


class students_detail(generics.RetrieveUpdateDestroyAPIView):
    queryset = students.objects.all()
    serializer_class = StudentSerializer

class courses_list(generics.ListCreateAPIView):
    queryset = courses.objects.all()
    serializer_class = CoursesSerializer
  

class courses_detail(generics.RetrieveUpdateDestroyAPIView):
    queryset = courses.objects.all()
    serializer_class = CoursesSerializer

def displaycourses(request):
    callapi=requests.get('http://localhost:8000/api/core/courses/')
    results=callapi.json()
    return render(request,'index.html',{'courses':results})

def display(request):
    callapi=requests.get('http://localhost:8000/api/core/students/')
    results=callapi.json()
    return render(request,'index.html',{'students':results})

class professors_list(APIView):
    """
    List all professors, or create a new customer.
    """
    def get(self, request, format=None):
        Professor = professor.objects.all()
        serializer = ProfessorSerializer(Professor, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = ProfessorSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class professors_detail(APIView):
    """
    Retrieve, update or delete a customer instance.
    """
    def get_object(self, pk):
        try:
            return professors.objects.get(pk=pk)
        except professors.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        Professor = self.get_object(pk)
        serializer = ProfessorSerializer(Professor)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        Professor = self.get_object(pk)
        serializer = ProfessorSerializer(Professor, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        Professor = self.get_object(pk)
        Professor.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


def displayprofessors(request):
    callapi=requests.get('http://localhost:8000/api/core/professors/')
    results=callapi.json()
    return render(request,'index.html',{'professors':results})

def displaystudents(request):
    callapi=requests.get('http://localhost:8000/api/core/students/')
    results=callapi.json()
    return render(request,'index.html',{'students':results})



class registration_list(APIView):
    """
    List all registration, or create a new customer.
    """
    def get(self, request, format=None):
        Registration = registration.objects.all()
        serializer = RegistrationSerializer(Registration, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = RegistrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class registration_detail(APIView):
    """
    Retrieve, update or delete a customer instance.
    """
    def get_object(self, pk):
        try:
            return registration.objects.get(pk=pk)
        except registration.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        Registration = self.get_object(pk)
        serializer = RegistrationSerializer(Registration)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        Registration = self.get_object(pk)
        serializer = RegistrationSerializer(Registration, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        Registration = self.get_object(pk)
        Registration.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

def displayreg(request):
    callapi=requests.get('http://localhost:8000/api/core/registration/')
    results=callapi.json()
    return render(request,'index.html',{'registration':results})


def registerPage(request):

	form = CreateUserForm()
	if request.method == 'POST':
		form = CreateUserForm(request.POST)
		if form.is_valid():
			user = form.save()
			username = form.cleaned_data.get('username')

			group = Group.objects.get(name='students')
			user.groups.add(group)

			messages.success(request, 'Account was created for ' + username)

			return redirect('index.html')
		

	context = {'form':form}
	return render(request, 'signin.html', context)