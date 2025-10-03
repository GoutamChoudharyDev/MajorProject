# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status
# from rest_framework.permissions import IsAuthenticated
# from .models import Property, PropertyImage, Booking
# from .serializers import PropertyListSerializer, BookingSerializer
# from django.core.mail import send_mail
# from django.conf import settings

# # ------------------ Properties List ------------------
# class PropertiesListView(APIView):
#     def get(self, request):
#         properties = Property.objects.all()
#         serializer = PropertyListSerializer(properties, many=True, context={'request': request})
#         return Response(serializer.data, status=status.HTTP_200_OK)


# # ------------------ Property Create ------------------
# class PropertyCreateView(APIView):
#     permission_classes = [IsAuthenticated]

#     def post(self, request):
#         title = request.data.get("title")
#         location = request.data.get("location")
#         price = request.data.get("price")
#         description = request.data.get("description")
#         images = request.FILES.getlist("images")

#         if len(images) < 3:
#             return Response({"error": "Please upload at least 3 images."}, status=status.HTTP_400_BAD_REQUEST)

#         property_instance = Property.objects.create(
#             owner=request.user,
#             title=title,
#             location=location,
#             price=price,
#             description=description
#         )

#         for img in images:
#             PropertyImage.objects.create(property=property_instance, image=img)

#         serializer = PropertyListSerializer(property_instance, context={'request': request})
#         return Response(serializer.data, status=status.HTTP_201_CREATED)


# # ------------------ Booking Create ------------------
# class BookingCreateView(APIView):
#     permission_classes = [IsAuthenticated]

#     def post(self, request):
#         serializer = BookingSerializer(data=request.data)
#         if serializer.is_valid():
#             booking = serializer.save()
#             property_obj = booking.property
#             owner_email = property_obj.owner.email

#             # Email to User
#             send_mail(
#                 subject="Booking Confirmation",
#                 message=f"Hello {booking.name},\n\nYour booking for '{property_obj.title}' "
#                         f"from {booking.check_in} to {booking.check_out} for {booking.guests} guests "
#                         f"has been confirmed.\n\nThank you!",
#                 from_email=settings.DEFAULT_FROM_EMAIL,
#                 recipient_list=[booking.email],
#                 fail_silently=False,
#             )

#             # Email to Owner
#             send_mail(
#                 subject="Your Property Has Been Booked",
#                 message=f"Hello {property_obj.owner.username},\n\nYour property '{property_obj.title}' "
#                         f"has been booked by {booking.name} ({booking.email}, {booking.phone}) "
#                         f"from {booking.check_in} to {booking.check_out} for {booking.guests} guests.",
#                 from_email=settings.DEFAULT_FROM_EMAIL,
#                 recipient_list=[owner_email],
#                 fail_silently=False,
#             )

#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# # ------------------ My Listings ------------------
# class MyListingsView(APIView):
#     permission_classes = [IsAuthenticated]

#     def get(self, request):
#         properties = Property.objects.filter(owner=request.user).order_by("-created_at")
#         serializer = PropertyListSerializer(properties, many=True, context={'request': request})
#         return Response(serializer.data, status=status.HTTP_200_OK)
        

# # -------------------- My Listing Details (Edit & Delete) --------------------
# class MyListingDetailView(APIView):
#     permission_classes = [IsAuthenticated]

#     def get_object(self, pk, user):
#         try:
#             return Property.objects.get(id=pk, owner=user)
#         except Property.DoesNotExist:
#             return None

#     def delete(self, request, pk):
#         property_instance = self.get_object(pk, request.user)
#         if not property_instance:
#             return Response(
#                 {"error": "Property not found or not owned by you"},
#                 status=status.HTTP_404_NOT_FOUND,
#             )
#         property_instance.delete()
#         return Response(
#             {"message": "Property deleted successfully ✅"},
#             status=status.HTTP_204_NO_CONTENT,
#         )

#     def put(self, request, pk):
#         """
#         Edit/Update a property.
#         Full update (replace all fields).
#         """
#         property_instance = self.get_object(pk, request.user)
#         if not property_instance:
#             return Response(
#                 {"error": "Property not found or not owned by you"},
#                 status=status.HTTP_404_NOT_FOUND,
#             )

#         # Get updated data from request
#         title = request.data.get("title", property_instance.title)
#         location = request.data.get("location", property_instance.location)
#         price = request.data.get("price", property_instance.price)
#         description = request.data.get("description", property_instance.description)
#         images = request.FILES.getlist("images")

#         # Update fields
#         property_instance.title = title
#         property_instance.location = location
#         property_instance.price = price
#         property_instance.description = description
#         property_instance.save()

#         # If new images are provided, replace old ones
#         if images:
#             # Delete old images
#             property_instance.images.all().delete()
#             for img in images:
#                 PropertyImage.objects.create(property=property_instance, image=img)

#         serializer = PropertyListSerializer(property_instance, context={'request': request})
#         return Response(serializer.data, status=status.HTTP_200_OK)




# from rest_framework import generics, permissions

# # -------------------- Booking List for a Property --------------------
# class BookingListView(generics.ListAPIView):
#     serializer_class = BookingSerializer
#     permission_classes = [permissions.IsAuthenticated]

#     def get_queryset(self):
#         property_id = self.request.query_params.get("property")
#         if property_id:
#             return Booking.objects.filter(property_id=property_id)
#         return Booking.objects.all()


# # -------------------- Booking Cancel/Delete --------------------
# class BookingDeleteView(generics.DestroyAPIView):
#     queryset = Booking.objects.all()
#     serializer_class = BookingSerializer
#     permission_classes = [permissions.IsAuthenticated]

#     def delete(self, request, *args, **kwargs):
#         booking = self.get_object()
#         # Only the booking user or property owner can cancel
#         if booking.property.owner != request.user and booking.email != request.user.email:
#             return Response({"error": "Not authorized to cancel this booking"}, status=403)
#         return super().delete(request, *args, **kwargs)
