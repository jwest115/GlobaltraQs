from rest_framework import generics, permissions
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import UserSerializer, RegisterSerializer, LoginSerializer

# Register API


# abstraction so we dont have to write every piece of functionality
class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            # The Token.objects.create returns a tuple (instance, token). So in order to get token use the index 1
            "token": AuthToken.objects.create(user)[1]
        })


""" class RegisterAPI(generics.GenericAPIView):
    serialzer_class = RegisterSerializer

    # when we make request, username, email etc is in request. args kwargscould take more arguments
    def post(self, request, *args, **kwargs):
        # request data gest passed in here
        serializer = self.get_serializer(data=request.data)
        # send back any erros if needed
        serializer.is_valid(raise_exception=True)
        user = serializer.save()  # saves user in database
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            # create token for that specific user. hwne u make a request, its going to know who u are with that token
            "token": AuthToken.objects.create(user)
        })
 """
# Login API


class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })

# Get User API


class UserAPI(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = UserSerializer

    def get_object(self):  # we want to return user
        return self.request.user  # sends back user associated with token
