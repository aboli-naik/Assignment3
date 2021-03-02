from django.db import models

class students(models.Model):
    name=models.CharField(max_length=50,blank=False,default='')
    email=models.CharField(max_length=50,blank=False,default='')
    coursename = models.CharField(max_length=50,blank=False,default='')
    birthdate=models.DateField(blank=False, default='')
    password=models.CharField(max_length=50,blank=False,default='')
  
class professor(models.Model):
    name=models.CharField(max_length=50,blank=False,default='')
    email=models.CharField(max_length=50,blank=False,default='')
    coursename = models.CharField(max_length=50,blank=False,default='')
    password=models.CharField(max_length=50,blank=False,default='')

class courses(models.Model):
   
    coursename = models.CharField(max_length=50,blank=False,default='')
    coursedescription=models.CharField(max_length=150,blank=False,default='')
    

class registration(models.Model):

    coursename = models.ForeignKey(courses, on_delete=models.SET_NULL,null=True)
    studentname= models.ForeignKey(students, on_delete=models.SET_NULL,null=True)

class evaluation(models.Model):
    quizes=models.CharField(max_length=50,blank=False,default='')
    assignments=models.CharField(max_length=50,blank=False,default='')
    marks=models.IntegerField(blank=False,default='0')

class signin(models.Model):

    fullname = models.ForeignKey(courses, on_delete=models.SET_NULL,null=True)
    email= models.ForeignKey(students, on_delete=models.SET_NULL,null=True)

    