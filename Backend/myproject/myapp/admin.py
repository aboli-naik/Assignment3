from django.contrib import admin

from .models import students,professor, courses,registration,evaluation
admin.site.register(students)
admin.site.register(professor)
admin.site.register(courses)
admin.site.register(registration)
admin.site.register(evaluation)